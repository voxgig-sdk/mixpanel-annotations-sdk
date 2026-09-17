<?php
declare(strict_types=1);

// MixpanelAnnotations SDK utility: result_body

class MixpanelAnnotationsResultBody
{
    public static function call(MixpanelAnnotationsContext $ctx): ?MixpanelAnnotationsResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
