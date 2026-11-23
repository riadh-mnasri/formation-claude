import java.util.List;
import java.util.Locale;
import java.util.function.Function;
import java.util.stream.IntStream;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.vectorstore.QuestionAnswerAdvisor;
import org.springframework.ai.chat.messages.AssistantMessage;
import org.springframework.ai.chat.model.Generation;
import org.springframework.ai.document.Document;
import org.springframework.ai.embedding.Embedding;
import org.springframework.ai.embedding.EmbeddingModel;
import org.springframework.ai.embedding.EmbeddingRequest;
import org.springframework.ai.embedding.EmbeddingResponse;
import org.springframework.ai.vectorstore.SearchRequest;
import org.springframework.ai.vectorstore.SimpleVectorStore;
import dev.langchain4j.data.message.AiMessage;
import dev.langchain4j.model.chat.ChatModel;
import dev.langchain4j.model.chat.request.ChatRequest;
import dev.langchain4j.model.chat.response.ChatResponse;
import dev.langchain4j.rag.content.Content;
import dev.langchain4j.rag.content.retriever.ContentRetriever;
import dev.langchain4j.service.AiServices;

public class AtelierRag {
    private static final String STANDARD = "LIV-01 | France : livraison standard offerte dès 50 €.";
    private static final String EXPRESS = "LIV-02 | France : livraison express facturée 12 €.";
    private static final String RETURNS = "RET-01 | France : retours possibles dans les 30 jours.";
    private static final String WITH_SOURCE = "Livraison standard offerte à 50 € [LIV-01].";
    private static final String WITHOUT_SOURCE = "Information insuffisante dans le corpus.";

    public interface Assistant {
        String answer(String question);
    }

    private static float[] teachingVector(String text) {
        String lower = text.toLowerCase(Locale.ROOT);
        if (lower.contains("canada")) return new float[]{0, 0, 0, 1};
        if (lower.contains("standard")) return new float[]{1, 0, 0, 0};
        if (lower.contains("express")) return new float[]{0, 1, 0, 0};
        return new float[]{0, 0, 1, 0};
    }

    private static String teachingModel(String prompt) {
        return prompt.contains(STANDARD) ? WITH_SOURCE : WITHOUT_SOURCE;
    }

    private static Function<String, String> spring() {
        EmbeddingModel embeddings = new EmbeddingModel() {
            public float[] embed(Document document) {
                return teachingVector(document.getText());
            }

            public EmbeddingResponse call(EmbeddingRequest request) {
                var inputs = request.getInstructions();
                return new EmbeddingResponse(IntStream.range(0, inputs.size())
                    .mapToObj(i -> new Embedding(teachingVector(inputs.get(i)), i))
                    .toList());
            }
        };
        var store = SimpleVectorStore.builder(embeddings).build();
        store.add(List.of(new Document(STANDARD), new Document(EXPRESS), new Document(RETURNS)));
        var advisor = QuestionAnswerAdvisor.builder(store)
            .searchRequest(SearchRequest.builder().topK(1).similarityThreshold(0.9).build())
            .build();
        var client = ChatClient.create(prompt ->
            new org.springframework.ai.chat.model.ChatResponse(
                List.of(new Generation(new AssistantMessage(teachingModel(prompt.getContents()))))));
        return question -> client.prompt().advisors(advisor).user(question).call().content();
    }

    private static Function<String, String> langchain() {
        ContentRetriever retriever = query -> {
            float[] vector = teachingVector(query.text());
            if (vector[0] == 1) return List.of(Content.from(STANDARD));
            if (vector[1] == 1) return List.of(Content.from(EXPRESS));
            if (vector[2] == 1) return List.of(Content.from(RETURNS));
            return List.of();
        };
        ChatModel model = new ChatModel() {
            @Override public ChatResponse doChat(ChatRequest request) {
                return ChatResponse.builder()
                    .aiMessage(AiMessage.from(teachingModel(request.messages().toString())))
                    .build();
            }
        };
        Assistant assistant = AiServices.builder(Assistant.class)
            .chatModel(model).contentRetriever(retriever).build();
        return assistant::answer;
    }

    private static void verify(String label, Function<String, String> answer) {
        String supported = answer.apply("Livraison standard à 50 € en France ?");
        String unsupported = answer.apply("Livraison standard à 50 € au Canada ?");
        if (!WITH_SOURCE.equals(supported) || !WITHOUT_SOURCE.equals(unsupported)) {
            throw new AssertionError(label + ": " + supported + " / " + unsupported);
        }
        System.out.println(label);
        System.out.println("  France : " + supported);
        System.out.println("  Canada : " + unsupported);
    }

    public static void main(String[] args) {
        System.out.println("Recherche réelle · modèle et vecteurs de test déterministes");
        verify("Spring AI", spring());
        verify("LangChain4j", langchain());
    }
}
