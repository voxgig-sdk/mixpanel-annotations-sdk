# MixpanelAnnotations SDK exists test

import pytest
from mixpanelannotations_sdk import MixpanelAnnotationsSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = MixpanelAnnotationsSDK.test(None, None)
        assert testsdk is not None
