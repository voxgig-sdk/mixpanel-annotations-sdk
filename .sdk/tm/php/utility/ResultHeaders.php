<?php
declare(strict_types=1);

// MixpanelAnnotations SDK utility: result_headers

class MixpanelAnnotationsResultHeaders
{
    public static function call(MixpanelAnnotationsContext $ctx): ?MixpanelAnnotationsResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
