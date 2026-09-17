<?php
declare(strict_types=1);

// MixpanelAnnotations SDK utility: prepare_headers

class MixpanelAnnotationsPrepareHeaders
{
    public static function call(MixpanelAnnotationsContext $ctx): array
    {
        $options = $ctx->client->options_map();
        $headers = \Voxgig\Struct\Struct::getprop($options, 'headers');
        if (!$headers) {
            return [];
        }
        $out = \Voxgig\Struct\Struct::clone($headers);
        return is_array($out) ? $out : [];
    }
}
