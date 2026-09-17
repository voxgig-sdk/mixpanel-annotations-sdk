<?php
declare(strict_types=1);

// MixpanelAnnotations SDK base feature

class MixpanelAnnotationsBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(MixpanelAnnotationsContext $ctx, array $options): void {}
    public function PostConstruct(MixpanelAnnotationsContext $ctx): void {}
    public function PostConstructEntity(MixpanelAnnotationsContext $ctx): void {}
    public function SetData(MixpanelAnnotationsContext $ctx): void {}
    public function GetData(MixpanelAnnotationsContext $ctx): void {}
    public function GetMatch(MixpanelAnnotationsContext $ctx): void {}
    public function SetMatch(MixpanelAnnotationsContext $ctx): void {}
    public function PrePoint(MixpanelAnnotationsContext $ctx): void {}
    public function PreSpec(MixpanelAnnotationsContext $ctx): void {}
    public function PreRequest(MixpanelAnnotationsContext $ctx): void {}
    public function PreResponse(MixpanelAnnotationsContext $ctx): void {}
    public function PreResult(MixpanelAnnotationsContext $ctx): void {}
    public function PreDone(MixpanelAnnotationsContext $ctx): void {}
    public function PreUnexpected(MixpanelAnnotationsContext $ctx): void {}
}
