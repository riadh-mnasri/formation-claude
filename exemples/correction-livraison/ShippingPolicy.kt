package formation.shipping

class ShippingPolicy {
    fun isFree(subtotalCents: Long): Boolean {
        return subtotalCents >= 5000L
    }
}
