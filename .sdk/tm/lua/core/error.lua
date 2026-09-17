-- MixpanelAnnotations SDK error

local MixpanelAnnotationsError = {}
MixpanelAnnotationsError.__index = MixpanelAnnotationsError


function MixpanelAnnotationsError.new(code, msg, ctx)
  local self = setmetatable({}, MixpanelAnnotationsError)
  self.is_sdk_error = true
  self.sdk = "MixpanelAnnotations"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function MixpanelAnnotationsError:error()
  return self.msg
end


function MixpanelAnnotationsError:__tostring()
  return self.msg
end


return MixpanelAnnotationsError
