package formation.shipping

import kotlin.test.Test
import kotlin.test.assertFalse
import kotlin.test.assertTrue

class ShippingPolicyTest {
    private val policy = ShippingPolicy()

    @Test
    fun belowThresholdIsPaid() {
        assertFalse(policy.isFree(4999L))
    }

    @Test
    fun exactThresholdIsFree() {
        assertTrue(policy.isFree(5000L))
    }

    @Test
    fun aboveThresholdIsFree() {
        assertTrue(policy.isFree(5001L))
    }
}
