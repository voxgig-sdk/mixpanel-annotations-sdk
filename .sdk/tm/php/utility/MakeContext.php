<?php
declare(strict_types=1);

// MixpanelAnnotations SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class MixpanelAnnotationsMakeContext
{
    public static function call(array $ctxmap, ?MixpanelAnnotationsContext $basectx): MixpanelAnnotationsContext
    {
        return new MixpanelAnnotationsContext($ctxmap, $basectx);
    }
}
