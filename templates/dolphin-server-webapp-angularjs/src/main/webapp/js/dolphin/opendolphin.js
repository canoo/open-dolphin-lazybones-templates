
define('Command',["require", "exports"], function(require, exports) {
    (function (dolphin) {
        var Command = (function () {
            function Command() {
                this.id = "dolphin-core-command";
            }
            return Command;
        })();
        dolphin.Command = Command;
    })(exports.dolphin || (exports.dolphin = {}));
    var dolphin = exports.dolphin;
});
//# sourceMappingURL=Command.js.map
;
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define('NamedCommand',["require", "exports", "Command"], function(require, exports, __cmd__) {
    var cmd = __cmd__;
    (function (dolphin) {
        var NamedCommand = (function (_super) {
            __extends(NamedCommand, _super);
            function NamedCommand(name) {
                _super.call(this);
                this.id = name;
                this.className = "org.opendolphin.core.comm.NamedCommand";
            }
            return NamedCommand;
        })(cmd.dolphin.Command);
        dolphin.NamedCommand = NamedCommand;
    })(exports.dolphin || (exports.dolphin = {}));
    var dolphin = exports.dolphin;
});
//# sourceMappingURL=NamedCommand.js.map
;
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define('SignalCommand',["require", "exports", "Command"], function(require, exports, __cmd__) {
    var cmd = __cmd__;
    (function (dolphin) {
        var SignalCommand = (function (_super) {
            __extends(SignalCommand, _super);
            function SignalCommand(name) {
                _super.call(this);
                this.id = name;
                this.className = "org.opendolphin.core.comm.SignalCommand";
            }
            return SignalCommand;
        })(cmd.dolphin.Command);
        dolphin.SignalCommand = SignalCommand;
    })(exports.dolphin || (exports.dolphin = {}));
    var dolphin = exports.dolphin;
});
//# sourceMappingURL=SignalCommand.js.map
;
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define('EmptyNotification',["require", "exports", "Command"], function(require, exports, __cmd__) {
    var cmd = __cmd__;
    (function (dolphin) {
        var EmptyNotification = (function (_super) {
            __extends(EmptyNotification, _super);
            function EmptyNotification() {
                _super.call(this);
                this.id = "Empty";
                this.className = "org.opendolphin.core.comm.EmptyNotification";
            }
            return EmptyNotification;
        })(cmd.dolphin.Command);
        dolphin.EmptyNotification = EmptyNotification;
    })(exports.dolphin || (exports.dolphin = {}));
    var dolphin = exports.dolphin;
});
//# sourceMappingURL=EmptyNotification.js.map
;
define('EventBus',["require", "exports"], function(require, exports) {
    (function (dolphin) {
        var EventBus = (function () {
            function EventBus() {
                this.eventHandlers = [];
            }
            EventBus.prototype.onEvent = function (eventHandler) {
                this.eventHandlers.push(eventHandler);
            };
            EventBus.prototype.trigger = function (event) {
                this.eventHandlers.forEach(function (handle) {
                    return handle(event);
                });
            };
            return EventBus;
        })();
        dolphin.EventBus = EventBus;
    })(exports.dolphin || (exports.dolphin = {}));
    var dolphin = exports.dolphin;
});
//# sourceMappingURL=EventBus.js.map
;
define('Tag',["require", "exports"], function(require, exports) {
    (function (dolphin) {
        var Tag = (function () {
            function Tag() {
            }
            Tag.value = function () {
                return "VALUE";
            };

            Tag.label = function () {
                return "LABEL";
            };

            Tag.tooltip = function () {
                return "TOOLTIP";
            };

            Tag.mandatory = function () {
                return "MANDATORY";
            };

            Tag.visible = function () {
                return "VISIBLE";
            };

            Tag.enabled = function () {
                return "ENABLED";
            };

            Tag.regex = function () {
                return "REGEX";
            };

            Tag.widgetHint = function () {
                return "WIDGET_HINT";
            };

            Tag.valueType = function () {
                return "VALUE_TYPE";
            };
            return Tag;
        })();
        dolphin.Tag = Tag;
    })(exports.dolphin || (exports.dolphin = {}));
    var dolphin = exports.dolphin;
});
//# sourceMappingURL=Tag.js.map
;
define('ClientPresentationModel',["require", "exports", "EventBus", "Tag"], function(require, exports, __bus__, __tags__) {
    
    var bus = __bus__;
    var tags = __tags__;

    (function (dolphin) {
        var presentationModelInstanceCount = 0;

        var ClientPresentationModel = (function () {
            function ClientPresentationModel(id, presentationModelType) {
                this.id = id;
                this.presentationModelType = presentationModelType;
                this.attributes = [];
                this.clientSideOnly = false;
                this.dirty = false;
                if (typeof id !== 'undefined' && id != null) {
                    this.id = id;
                } else {
                    this.id = (presentationModelInstanceCount++).toString();
                }
                this.invalidBus = new bus.dolphin.EventBus();
                this.dirtyValueChangeBus = new bus.dolphin.EventBus();
            }
            // todo dk: align with Java version: move to ClientDolphin and auto-add to model store
            /** a copy constructor for anything but IDs. Per default, copies are client side only, no automatic update applies. */
            ClientPresentationModel.prototype.copy = function () {
                var result = new ClientPresentationModel(null, this.presentationModelType);
                result.clientSideOnly = true;
                this.getAttributes().forEach(function (attribute) {
                    var attributeCopy = attribute.copy();
                    result.addAttribute(attributeCopy);
                });
                return result;
            };

            //add array of attributes
            ClientPresentationModel.prototype.addAttributes = function (attributes) {
                var _this = this;
                if (!attributes || attributes.length < 1)
                    return;
                attributes.forEach(function (attr) {
                    _this.addAttribute(attr);
                });
            };
            ClientPresentationModel.prototype.addAttribute = function (attribute) {
                var _this = this;
                if (!attribute || (this.attributes.indexOf(attribute) > -1)) {
                    return;
                }
                if (this.findAttributeByPropertyNameAndTag(attribute.propertyName, attribute.tag)) {
                    throw new Error("There already is an attribute with property name: " + attribute.propertyName + " and tag: " + attribute.tag + " in presentation model with id: " + this.id);
                }
                if (attribute.getQualifier() && this.findAttributeByQualifier(attribute.getQualifier())) {
                    throw new Error("There already is an attribute with qualifier: " + attribute.getQualifier() + " in presentation model with id: " + this.id);
                }
                attribute.setPresentationModel(this);
                this.attributes.push(attribute);
                if (attribute.tag == tags.dolphin.Tag.value()) {
                    this.updateDirty();
                }
                attribute.onValueChange(function (evt) {
                    _this.invalidBus.trigger({ source: _this });
                });
            };

            ClientPresentationModel.prototype.updateDirty = function () {
                for (var i = 0; i < this.attributes.length; i++) {
                    if (this.attributes[i].isDirty()) {
                        this.setDirty(true);
                        return;
                    }
                }
                ;
                this.setDirty(false);
            };

            ClientPresentationModel.prototype.updateAttributeDirtyness = function () {
                for (var i = 0; i < this.attributes.length; i++) {
                    this.attributes[i].updateDirty();
                }
            };
            ClientPresentationModel.prototype.isDirty = function () {
                return this.dirty;
            };

            ClientPresentationModel.prototype.setDirty = function (dirty) {
                var oldVal = this.dirty;
                this.dirty = dirty;
                this.dirtyValueChangeBus.trigger({ 'oldValue': oldVal, 'newValue': this.dirty });
            };

            ClientPresentationModel.prototype.reset = function () {
                this.attributes.forEach(function (attribute) {
                    attribute.reset();
                });
            };

            ClientPresentationModel.prototype.rebase = function () {
                this.attributes.forEach(function (attribute) {
                    attribute.rebase();
                });
            };

            ClientPresentationModel.prototype.onDirty = function (eventHandler) {
                this.dirtyValueChangeBus.onEvent(eventHandler);
            };
            ClientPresentationModel.prototype.onInvalidated = function (handleInvalidate) {
                this.invalidBus.onEvent(handleInvalidate);
            };

            /** returns a copy of the internal state */
            ClientPresentationModel.prototype.getAttributes = function () {
                return this.attributes.slice(0);
            };
            ClientPresentationModel.prototype.getAt = function (propertyName, tag) {
                if (typeof tag === "undefined") { tag = tags.dolphin.Tag.value(); }
                return this.findAttributeByPropertyNameAndTag(propertyName, tag);
            };

            ClientPresentationModel.prototype.findAttributeByPropertyName = function (propertyName) {
                return this.findAttributeByPropertyNameAndTag(propertyName, tags.dolphin.Tag.value());
            };

            ClientPresentationModel.prototype.findAllAttributesByPropertyName = function (propertyName) {
                var result = [];
                if (!propertyName)
                    return null;
                this.attributes.forEach(function (attribute) {
                    if (attribute.propertyName == propertyName) {
                        result.push(attribute);
                    }
                });
                return result;
            };

            ClientPresentationModel.prototype.findAttributeByPropertyNameAndTag = function (propertyName, tag) {
                if (!propertyName || !tag)
                    return null;
                for (var i = 0; i < this.attributes.length; i++) {
                    if ((this.attributes[i].propertyName == propertyName) && (this.attributes[i].tag == tag)) {
                        return this.attributes[i];
                    }
                }
                return null;
            };
            ClientPresentationModel.prototype.findAttributeByQualifier = function (qualifier) {
                if (!qualifier)
                    return null;
                for (var i = 0; i < this.attributes.length; i++) {
                    if (this.attributes[i].getQualifier() == qualifier) {
                        return this.attributes[i];
                    }
                }
                ;
                return null;
            };

            ClientPresentationModel.prototype.findAttributeById = function (id) {
                if (!id)
                    return null;
                for (var i = 0; i < this.attributes.length; i++) {
                    if (this.attributes[i].id == id) {
                        return this.attributes[i];
                    }
                }
                ;
                return null;
            };

            ClientPresentationModel.prototype.syncWith = function (sourcePresentationModel) {
                this.attributes.forEach(function (targetAttribute) {
                    var sourceAttribute = sourcePresentationModel.getAt(targetAttribute.propertyName, targetAttribute.tag);
                    if (sourceAttribute) {
                        targetAttribute.syncWith(sourceAttribute);
                    }
                });
            };
            return ClientPresentationModel;
        })();
        dolphin.ClientPresentationModel = ClientPresentationModel;
    })(exports.dolphin || (exports.dolphin = {}));
    var dolphin = exports.dolphin;
});
//# sourceMappingURL=ClientPresentationModel.js.map
;
define('ClientAttribute',["require", "exports", "EventBus", "Tag"], function(require, exports, __bus__, __tags__) {
    
    var bus = __bus__;
    var tags = __tags__;

    (function (dolphin) {
        var ClientAttribute = (function () {
            function ClientAttribute(propertyName, qualifier, value, tag) {
                if (typeof tag === "undefined") { tag = tags.dolphin.Tag.value(); }
                this.propertyName = propertyName;
                this.tag = tag;
                this.dirty = false;
                this.id = "" + (ClientAttribute.clientAttributeInstanceCount++) + "C";
                this.valueChangeBus = new bus.dolphin.EventBus();
                this.qualifierChangeBus = new bus.dolphin.EventBus();
                this.dirtyValueChangeBus = new bus.dolphin.EventBus();
                this.baseValueChangeBus = new bus.dolphin.EventBus();
                this.setValue(value);
                this.setBaseValue(value);
                this.setQualifier(qualifier);
            }
            /** a copy constructor with new id and no presentation model */
            ClientAttribute.prototype.copy = function () {
                var result = new ClientAttribute(this.propertyName, this.getQualifier(), this.getValue(), this.tag);
                result.setBaseValue(this.getBaseValue());
                return result;
            };

            ClientAttribute.prototype.isDirty = function () {
                return this.dirty;
            };

            ClientAttribute.prototype.getBaseValue = function () {
                return this.baseValue;
            };

            ClientAttribute.prototype.setPresentationModel = function (presentationModel) {
                if (this.presentationModel) {
                    alert("You can not set a presentation model for an attribute that is already bound.");
                }
                this.presentationModel = presentationModel;
            };

            ClientAttribute.prototype.getPresentationModel = function () {
                return this.presentationModel;
            };

            ClientAttribute.prototype.getValue = function () {
                return this.value;
            };

            ClientAttribute.prototype.setValue = function (newValue) {
                var verifiedValue = ClientAttribute.checkValue(newValue);
                if (this.value == verifiedValue)
                    return;
                var oldValue = this.value;
                this.value = verifiedValue;
                this.setDirty(this.calculateDirty(this.baseValue, verifiedValue));
                this.valueChangeBus.trigger({ 'oldValue': oldValue, 'newValue': verifiedValue });
            };

            ClientAttribute.prototype.calculateDirty = function (baseValue, value) {
                if (baseValue == null) {
                    return value != null;
                } else {
                    return baseValue != value;
                }
            };

            ClientAttribute.prototype.updateDirty = function () {
                this.setDirty(this.calculateDirty(this.baseValue, this.value));
            };

            ClientAttribute.prototype.setDirty = function (dirty) {
                var oldVal = this.dirty;
                this.dirty = dirty;
                this.dirtyValueChangeBus.trigger({ 'oldValue': oldVal, 'newValue': this.dirty });
                if (this.presentationModel)
                    this.presentationModel.updateDirty();
            };

            ClientAttribute.prototype.setQualifier = function (newQualifier) {
                if (this.qualifier == newQualifier)
                    return;
                var oldQualifier = this.qualifier;
                this.qualifier = newQualifier;
                this.qualifierChangeBus.trigger({ 'oldValue': oldQualifier, 'newValue': newQualifier });
            };

            ClientAttribute.prototype.getQualifier = function () {
                return this.qualifier;
            };

            ClientAttribute.prototype.setBaseValue = function (baseValue) {
                if (this.baseValue == baseValue)
                    return;
                var oldBaseValue = this.baseValue;
                this.baseValue = baseValue;
                this.setDirty(this.calculateDirty(baseValue, this.value));
                this.baseValueChangeBus.trigger({ 'oldValue': oldBaseValue, 'newValue': baseValue });
            };

            ClientAttribute.prototype.rebase = function () {
                this.setBaseValue(this.value);
                this.setDirty(false);
            };

            ClientAttribute.prototype.reset = function () {
                this.setValue(this.baseValue);
                this.setDirty(false);
            };

            ClientAttribute.checkValue = function (value) {
                if (value == null || value == undefined) {
                    return null;
                }
                var result = value;
                if (result instanceof String || result instanceof Boolean || result instanceof Number) {
                    result = value.valueOf();
                }
                if (result instanceof ClientAttribute) {
                    console.log("An Attribute may not itself contain an attribute as a value. Assuming you forgot to call value.");
                    result = this.checkValue((value).value);
                }
                var ok = false;
                if (this.SUPPORTED_VALUE_TYPES.indexOf(typeof result) > -1 || result instanceof Date) {
                    ok = true;
                }
                if (!ok) {
                    throw new Error("Attribute values of this type are not allowed: " + typeof value);
                }
                return result;
            };

            ClientAttribute.prototype.onValueChange = function (eventHandler) {
                this.valueChangeBus.onEvent(eventHandler);
                eventHandler({ "oldValue": this.value, "newValue": this.value });
            };

            ClientAttribute.prototype.onQualifierChange = function (eventHandler) {
                this.qualifierChangeBus.onEvent(eventHandler);
            };

            ClientAttribute.prototype.onDirty = function (eventHandler) {
                this.dirtyValueChangeBus.onEvent(eventHandler);
            };

            ClientAttribute.prototype.onBaseValueChange = function (eventHandler) {
                this.baseValueChangeBus.onEvent(eventHandler);
            };

            ClientAttribute.prototype.syncWith = function (sourceAttribute) {
                if (sourceAttribute) {
                    this.setQualifier(sourceAttribute.getQualifier());
                    this.setBaseValue(sourceAttribute.getBaseValue());
                    this.setValue(sourceAttribute.value);
                    // syncing propertyName and tag is not needed since they must be identical anyway
                }
            };
            ClientAttribute.SUPPORTED_VALUE_TYPES = ["string", "number", "boolean"];
            ClientAttribute.clientAttributeInstanceCount = 0;
            return ClientAttribute;
        })();
        dolphin.ClientAttribute = ClientAttribute;
    })(exports.dolphin || (exports.dolphin = {}));
    var dolphin = exports.dolphin;
});
//# sourceMappingURL=ClientAttribute.js.map
;
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define('AttributeCreatedNotification',["require", "exports", "Command", "Tag"], function(require, exports, __cmd__, __tags__) {
    var cmd = __cmd__;
    var tags = __tags__;
    (function (dolphin) {
        var AttributeCreatedNotification = (function (_super) {
            __extends(AttributeCreatedNotification, _super);
            function AttributeCreatedNotification(pmId, attributeId, propertyName, newValue, qualifier, tag) {
                if (typeof tag === "undefined") { tag = tags.dolphin.Tag.value(); }
                _super.call(this);
                this.pmId = pmId;
                this.attributeId = attributeId;
                this.propertyName = propertyName;
                this.newValue = newValue;
                this.qualifier = qualifier;
                this.tag = tag;
                this.id = 'AttributeCreated';
                this.className = "org.opendolphin.core.comm.AttributeCreatedNotification";
            }
            return AttributeCreatedNotification;
        })(cmd.dolphin.Command);
        dolphin.AttributeCreatedNotification = AttributeCreatedNotification;
    })(exports.dolphin || (exports.dolphin = {}));
    var dolphin = exports.dolphin;
});
//# sourceMappingURL=AttributeCreatedNotification.js.map
;
define('ClientDolphin',["require", "exports", "NamedCommand", "SignalCommand", "EmptyNotification", "ClientPresentationModel", "ClientAttribute", "AttributeCreatedNotification"], function(require, exports, __namedCmd__, __signlCmd__, __emptyNot__, __pm__, __ca__, __acn__) {
    var namedCmd = __namedCmd__;
    var signlCmd = __signlCmd__;
    var emptyNot = __emptyNot__;
    var pm = __pm__;
    
    
    var ca = __ca__;
    var acn = __acn__;

    (function (dolphin) {
        var ClientDolphin = (function () {
            function ClientDolphin() {
            }
            ClientDolphin.prototype.setClientConnector = function (clientConnector) {
                this.clientConnector = clientConnector;
            };

            ClientDolphin.prototype.getClientConnector = function () {
                return this.clientConnector;
            };

            ClientDolphin.prototype.send = function (commandName, onFinished) {
                this.clientConnector.send(new namedCmd.dolphin.NamedCommand(commandName), onFinished);
            };

            ClientDolphin.prototype.sendEmpty = function (onFinished) {
                this.clientConnector.send(new emptyNot.dolphin.EmptyNotification(), onFinished);
            };

            // factory method for attributes
            ClientDolphin.prototype.attribute = function (propertyName, qualifier, value, tag) {
                return new ca.dolphin.ClientAttribute(propertyName, qualifier, value, tag);
            };

            // factory method for presentation models
            ClientDolphin.prototype.presentationModel = function (id, type) {
                var attributes = [];
                for (var _i = 0; _i < (arguments.length - 2); _i++) {
                    attributes[_i] = arguments[_i + 2];
                }
                var model = new pm.dolphin.ClientPresentationModel(id, type);
                if (attributes && attributes.length > 0) {
                    attributes.forEach(function (attribute) {
                        model.addAttribute(attribute);
                    });
                }
                this.getClientModelStore().add(model);
                return model;
            };

            ClientDolphin.prototype.setClientModelStore = function (clientModelStore) {
                this.clientModelStore = clientModelStore;
            };

            ClientDolphin.prototype.getClientModelStore = function () {
                return this.clientModelStore;
            };

            ClientDolphin.prototype.listPresentationModelIds = function () {
                return this.getClientModelStore().listPresentationModelIds();
            };

            ClientDolphin.prototype.listPresentationModels = function () {
                return this.getClientModelStore().listPresentationModels();
            };

            ClientDolphin.prototype.findAllPresentationModelByType = function (presentationModelType) {
                return this.getClientModelStore().findAllPresentationModelByType(presentationModelType);
            };

            ClientDolphin.prototype.getAt = function (id) {
                return this.findPresentationModelById(id);
            };

            ClientDolphin.prototype.findPresentationModelById = function (id) {
                return this.getClientModelStore().findPresentationModelById(id);
            };
            ClientDolphin.prototype.deletePresentationModel = function (modelToDelete) {
                this.getClientModelStore().deletePresentationModel(modelToDelete, true);
            };

            ClientDolphin.prototype.deleteAllPresentationModelOfType = function (presentationModelType) {
                this.getClientModelStore().deleteAllPresentationModelOfType(presentationModelType);
            };

            ClientDolphin.prototype.updatePresentationModelQualifier = function (presentationModel) {
                var _this = this;
                presentationModel.getAttributes().forEach(function (sourceAttribute) {
                    _this.updateAttributeQualifier(sourceAttribute);
                });
            };

            ClientDolphin.prototype.updateAttributeQualifier = function (sourceAttribute) {
                if (!sourceAttribute.getQualifier())
                    return;
                var attributes = this.getClientModelStore().findAllAttributesByQualifier(sourceAttribute.getQualifier());
                attributes.forEach(function (targetAttribute) {
                    if (targetAttribute.tag != sourceAttribute.tag)
                        return;
                    targetAttribute.setValue(sourceAttribute.getValue());
                    targetAttribute.setBaseValue(sourceAttribute.getBaseValue());
                });
            };

            ClientDolphin.prototype.tag = function (presentationModel, propertyName, value, tag) {
                var clientAttribute = new ca.dolphin.ClientAttribute(propertyName, null, value, tag);
                this.addAttributeToModel(presentationModel, clientAttribute);
                return clientAttribute;
            };

            ClientDolphin.prototype.addAttributeToModel = function (presentationModel, clientAttribute) {
                presentationModel.addAttribute(clientAttribute);
                this.getClientModelStore().registerAttribute(clientAttribute);
                if (!presentationModel.clientSideOnly) {
                    this.clientConnector.send(new acn.dolphin.AttributeCreatedNotification(presentationModel.id, clientAttribute.id, clientAttribute.propertyName, clientAttribute.getValue(), clientAttribute.getQualifier(), clientAttribute.tag), null);
                }
            };

            ////// push support ///////
            ClientDolphin.prototype.startPushListening = function (pushActionName, releaseActionName) {
                this.clientConnector.setPushListener(new namedCmd.dolphin.NamedCommand(pushActionName));
                this.clientConnector.setReleaseCommand(new signlCmd.dolphin.SignalCommand(releaseActionName));
                this.clientConnector.setPushEnabled(true);
                this.clientConnector.listen();
            };
            ClientDolphin.prototype.stopPushListening = function () {
                this.clientConnector.setPushEnabled(false);
            };
            return ClientDolphin;
        })();
        dolphin.ClientDolphin = ClientDolphin;
    })(exports.dolphin || (exports.dolphin = {}));
    var dolphin = exports.dolphin;
});
//# sourceMappingURL=ClientDolphin.js.map
;
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define('CreatePresentationModelCommand',["require", "exports", "Command"], function(require, exports, __cmd__) {
    
    
    var cmd = __cmd__;
    (function (dolphin) {
        var CreatePresentationModelCommand = (function (_super) {
            __extends(CreatePresentationModelCommand, _super);
            function CreatePresentationModelCommand(presentationModel) {
                _super.call(this);
                this.attributes = [];
                this.clientSideOnly = false;
                this.id = "CreatePresentationModel";
                this.className = "org.opendolphin.core.comm.CreatePresentationModelCommand";
                this.pmId = presentationModel.id;
                this.pmType = presentationModel.presentationModelType;

                var attrs = this.attributes;
                presentationModel.getAttributes().forEach(function (attr) {
                    attrs.push({
                        propertyName: attr.propertyName,
                        id: attr.id,
                        qualifier: attr.getQualifier(),
                        value: attr.getValue(),
                        tag: attr.tag
                    });
                });
            }
            return CreatePresentationModelCommand;
        })(cmd.dolphin.Command);
        dolphin.CreatePresentationModelCommand = CreatePresentationModelCommand;
    })(exports.dolphin || (exports.dolphin = {}));
    var dolphin = exports.dolphin;
});
//# sourceMappingURL=CreatePresentationModelCommand.js.map
;
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define('ValueChangedCommand',["require", "exports", "Command"], function(require, exports, __cmd__) {
    var cmd = __cmd__;
    (function (dolphin) {
        var ValueChangedCommand = (function (_super) {
            __extends(ValueChangedCommand, _super);
            function ValueChangedCommand(attributeId, oldValue, newValue) {
                _super.call(this);
                this.attributeId = attributeId;
                this.oldValue = oldValue;
                this.newValue = newValue;
                this.id = "ValueChanged";
                this.className = "org.opendolphin.core.comm.ValueChangedCommand";
            }
            return ValueChangedCommand;
        })(cmd.dolphin.Command);
        dolphin.ValueChangedCommand = ValueChangedCommand;
    })(exports.dolphin || (exports.dolphin = {}));
    var dolphin = exports.dolphin;
});
//# sourceMappingURL=ValueChangedCommand.js.map
;
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define('ChangeAttributeMetadataCommand',["require", "exports", "Command"], function(require, exports, __cmd__) {
    var cmd = __cmd__;
    (function (dolphin) {
        var ChangeAttributeMetadataCommand = (function (_super) {
            __extends(ChangeAttributeMetadataCommand, _super);
            function ChangeAttributeMetadataCommand(attributeId, metadataName, value) {
                _super.call(this);
                this.attributeId = attributeId;
                this.metadataName = metadataName;
                this.value = value;
                this.id = 'ChangeAttributeMetadata';
                this.className = "org.opendolphin.core.comm.ChangeAttributeMetadataCommand";
            }
            return ChangeAttributeMetadataCommand;
        })(cmd.dolphin.Command);
        dolphin.ChangeAttributeMetadataCommand = ChangeAttributeMetadataCommand;
    })(exports.dolphin || (exports.dolphin = {}));
    var dolphin = exports.dolphin;
});
//# sourceMappingURL=ChangeAttributeMetadataCommand.js.map
;
define('Attribute',["require", "exports"], function(require, exports) {
    (function (dolphin) {
        var Attribute = (function () {
            function Attribute() {
            }
            Attribute.QUALIFIER_PROPERTY = "qualifier";
            Attribute.DIRTY_PROPERTY = "dirty";
            Attribute.BASE_VALUE = "baseValue";
            Attribute.VALUE = "value";
            Attribute.TAG = "tag";
            return Attribute;
        })();
        dolphin.Attribute = Attribute;
    })(exports.dolphin || (exports.dolphin = {}));
    var dolphin = exports.dolphin;
});
//# sourceMappingURL=Attribute.js.map
;
define('Map',["require", "exports"], function(require, exports) {
    (function (dolphin) {
        var Map = (function () {
            function Map() {
                this.keys = [];
                this.data = [];
            }
            Map.prototype.put = function (key, value) {
                if (!this.containsKey(key)) {
                    this.keys.push(key);
                }
                this.data[this.keys.indexOf(key)] = value;
            };

            Map.prototype.get = function (key) {
                return this.data[this.keys.indexOf(key)];
            };

            Map.prototype.remove = function (key) {
                if (this.containsKey(key)) {
                    var index = this.keys.indexOf(key);
                    this.keys.splice(index, 1);
                    this.data.splice(index, 1);
                    return true;
                }
                return false;
            };

            Map.prototype.isEmpty = function () {
                return this.keys.length == 0;
            };

            Map.prototype.length = function () {
                return this.keys.length;
            };

            Map.prototype.forEach = function (handler) {
                for (var i = 0; i < this.keys.length; i++) {
                    handler(this.keys[i], this.data[i]);
                }
            };

            Map.prototype.containsKey = function (key) {
                return this.keys.indexOf(key) > -1;
            };

            Map.prototype.containsValue = function (value) {
                return this.data.indexOf(value) > -1;
            };

            Map.prototype.values = function () {
                return this.data.slice(0);
            };

            Map.prototype.keySet = function () {
                return this.keys.slice(0);
            };
            return Map;
        })();
        dolphin.Map = Map;
    })(exports.dolphin || (exports.dolphin = {}));
    var dolphin = exports.dolphin;
});
//# sourceMappingURL=Map.js.map
;
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define('DeletedAllPresentationModelsOfTypeNotification',["require", "exports", "Command"], function(require, exports, __cmd__) {
    var cmd = __cmd__;
    (function (dolphin) {
        var DeletedAllPresentationModelsOfTypeNotification = (function (_super) {
            __extends(DeletedAllPresentationModelsOfTypeNotification, _super);
            function DeletedAllPresentationModelsOfTypeNotification(pmType) {
                _super.call(this);
                this.pmType = pmType;
                this.id = 'DeletedAllPresentationModelsOfType';
                this.className = "org.opendolphin.core.comm.DeletedAllPresentationModelsOfTypeNotification";
            }
            return DeletedAllPresentationModelsOfTypeNotification;
        })(cmd.dolphin.Command);
        dolphin.DeletedAllPresentationModelsOfTypeNotification = DeletedAllPresentationModelsOfTypeNotification;
    })(exports.dolphin || (exports.dolphin = {}));
    var dolphin = exports.dolphin;
});
//# sourceMappingURL=DeletedAllPresentationModelsOfTypeNotification.js.map
;
define('EventBus',["require", "exports"], function(require, exports) {
    (function (dolphin) {
        var EventBus = (function () {
            function EventBus() {
                this.eventHandlers = [];
            }
            EventBus.prototype.onEvent = function (eventHandler) {
                this.eventHandlers.push(eventHandler);
            };
            EventBus.prototype.trigger = function (event) {
                this.eventHandlers.forEach(function (handle) {
                    return handle(event);
                });
            };
            return EventBus;
        })();
        dolphin.EventBus = EventBus;
    })(exports.dolphin || (exports.dolphin = {}));
    var dolphin = exports.dolphin;
});
//# sourceMappingURL=EventBus.js.map
;
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define('DeletedPresentationModelNotification',["require", "exports", "Command"], function(require, exports, __cmd__) {
    var cmd = __cmd__;
    (function (dolphin) {
        var DeletedPresentationModelNotification = (function (_super) {
            __extends(DeletedPresentationModelNotification, _super);
            function DeletedPresentationModelNotification(pmId) {
                _super.call(this);
                this.pmId = pmId;
                this.id = 'DeletedPresentationModel';
                this.className = "org.opendolphin.core.comm.DeletedPresentationModelNotification";
            }
            return DeletedPresentationModelNotification;
        })(cmd.dolphin.Command);
        dolphin.DeletedPresentationModelNotification = DeletedPresentationModelNotification;
    })(exports.dolphin || (exports.dolphin = {}));
    var dolphin = exports.dolphin;
});
//# sourceMappingURL=DeletedPresentationModelNotification.js.map
;
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define('BaseValueChangedCommand',["require", "exports", "Command"], function(require, exports, __cmd__) {
    var cmd = __cmd__;
    (function (dolphin) {
        var BaseValueChangedCommand = (function (_super) {
            __extends(BaseValueChangedCommand, _super);
            function BaseValueChangedCommand(attributeId) {
                _super.call(this);
                this.attributeId = attributeId;
                this.id = 'BaseValueChanged';
                this.className = "org.opendolphin.core.comm.BaseValueChangedCommand";
            }
            return BaseValueChangedCommand;
        })(cmd.dolphin.Command);
        dolphin.BaseValueChangedCommand = BaseValueChangedCommand;
    })(exports.dolphin || (exports.dolphin = {}));
    var dolphin = exports.dolphin;
});
//# sourceMappingURL=BaseValueChangedCommand.js.map
;
define('ClientModelStore',["require", "exports", "CreatePresentationModelCommand", "ValueChangedCommand", "ChangeAttributeMetadataCommand", "Attribute", "Map", "DeletedAllPresentationModelsOfTypeNotification", "EventBus", "DeletedPresentationModelNotification", "BaseValueChangedCommand"], function(require, exports, __createPMCmd__, __valueChangedCmd__, __changeAttMD__, __attr__, __map__, __dpmoftn__, __bus__, __dpmn__, __bvcc__) {
    
    
    
    var createPMCmd = __createPMCmd__;
    
    var valueChangedCmd = __valueChangedCmd__;
    var changeAttMD = __changeAttMD__;
    var attr = __attr__;
    var map = __map__;
    var dpmoftn = __dpmoftn__;
    var bus = __bus__;
    
    var dpmn = __dpmn__;
    var bvcc = __bvcc__;

    (function (dolphin) {
        (function (Type) {
            Type[Type["ADDED"] = 'ADDED'] = "ADDED";
            Type[Type["REMOVED"] = 'REMOVED'] = "REMOVED";
        })(dolphin.Type || (dolphin.Type = {}));
        var Type = dolphin.Type;

        var ClientModelStore = (function () {
            function ClientModelStore(clientDolphin) {
                this.clientDolphin = clientDolphin;
                this.presentationModels = new map.dolphin.Map();
                this.presentationModelsPerType = new map.dolphin.Map();
                this.attributesPerId = new map.dolphin.Map();
                this.attributesPerQualifier = new map.dolphin.Map();
                this.modelStoreChangeBus = new bus.dolphin.EventBus();
            }
            ClientModelStore.prototype.getClientDolphin = function () {
                return this.clientDolphin;
            };

            ClientModelStore.prototype.registerModel = function (model) {
                var _this = this;
                if (model.clientSideOnly) {
                    return;
                }
                var connector = this.clientDolphin.getClientConnector();
                var createPMCommand = new createPMCmd.dolphin.CreatePresentationModelCommand(model);
                connector.send(createPMCommand, null);
                model.getAttributes().forEach(function (attribute) {
                    _this.registerAttribute(attribute);
                });
            };

            ClientModelStore.prototype.registerAttribute = function (attribute) {
                var _this = this;
                this.addAttributeById(attribute);
                if (attribute.getQualifier()) {
                    this.addAttributeByQualifier(attribute);
                }

                // whenever an attribute changes its value, the server needs to be notified
                // and all other attributes with the same qualifier are given the same value
                attribute.onValueChange(function (evt) {
                    var valueChangeCommand = new valueChangedCmd.dolphin.ValueChangedCommand(attribute.id, evt.oldValue, evt.newValue);
                    _this.clientDolphin.getClientConnector().send(valueChangeCommand, null);

                    if (attribute.getQualifier()) {
                        var attrs = _this.findAttributesByFilter(function (attr) {
                            return attr !== attribute && attr.getQualifier() == attribute.getQualifier();
                        });
                        attrs.forEach(function (attr) {
                            attr.setValue(attribute.getValue());
                        });
                    }
                });

                // all attributes with the same qualifier should have the same base value
                attribute.onBaseValueChange(function (evt) {
                    var baseValueChangeCommand = new bvcc.dolphin.BaseValueChangedCommand(attribute.id);
                    _this.clientDolphin.getClientConnector().send(baseValueChangeCommand, null);
                    if (attribute.getQualifier()) {
                        var attrs = _this.findAttributesByFilter(function (attr) {
                            return attr !== attribute && attr.getQualifier() == attribute.getQualifier();
                        });
                        attrs.forEach(function (attr) {
                            attr.setBaseValue(attribute.getBaseValue());
                        });
                    }
                });

                attribute.onQualifierChange(function (evt) {
                    var changeAttrMetadataCmd = new changeAttMD.dolphin.ChangeAttributeMetadataCommand(attribute.id, attr.dolphin.Attribute.QUALIFIER_PROPERTY, evt.newValue);
                    _this.clientDolphin.getClientConnector().send(changeAttrMetadataCmd, null);
                });
            };
            ClientModelStore.prototype.add = function (model) {
                if (!model) {
                    return false;
                }
                if (this.presentationModels.containsKey(model.id)) {
                    console.log("There already is a PM with id " + model.id);
                }
                var added = false;
                if (!this.presentationModels.containsValue(model)) {
                    this.presentationModels.put(model.id, model);
                    this.addPresentationModelByType(model);
                    this.registerModel(model);

                    this.modelStoreChangeBus.trigger({ 'eventType': Type.ADDED, 'clientPresentationModel': model });
                    added = true;
                }
                return added;
            };

            ClientModelStore.prototype.remove = function (model) {
                var _this = this;
                if (!model) {
                    return false;
                }
                var removed = false;
                if (this.presentationModels.containsValue(model)) {
                    this.removePresentationModelByType(model);
                    this.presentationModels.remove(model.id);
                    model.getAttributes().forEach(function (attribute) {
                        _this.removeAttributeById(attribute);
                        if (attribute.getQualifier()) {
                            _this.removeAttributeByQualifier(attribute);
                        }
                    });

                    this.modelStoreChangeBus.trigger({ 'eventType': Type.REMOVED, 'clientPresentationModel': model });
                    removed = true;
                }
                return removed;
            };

            ClientModelStore.prototype.findAttributesByFilter = function (filter) {
                var matches = [];
                this.presentationModels.forEach(function (key, model) {
                    model.getAttributes().forEach(function (attr) {
                        if (filter(attr)) {
                            matches.push(attr);
                        }
                    });
                });
                return matches;
            };

            ClientModelStore.prototype.addPresentationModelByType = function (model) {
                if (!model) {
                    return;
                }
                var type = model.presentationModelType;
                if (!type) {
                    return;
                }
                var presentationModels = this.presentationModelsPerType.get(type);
                if (!presentationModels) {
                    presentationModels = [];
                    this.presentationModelsPerType.put(type, presentationModels);
                }
                if (!(presentationModels.indexOf(model) > -1)) {
                    presentationModels.push(model);
                }
            };

            ClientModelStore.prototype.removePresentationModelByType = function (model) {
                if (!model || !(model.presentationModelType)) {
                    return;
                }

                var presentationModels = this.presentationModelsPerType.get(model.presentationModelType);
                if (!presentationModels) {
                    return;
                }
                if (presentationModels.length > -1) {
                    presentationModels.splice(presentationModels.indexOf(model), 1);
                }
                if (presentationModels.length === 0) {
                    this.presentationModelsPerType.remove(model.presentationModelType);
                }
            };

            ClientModelStore.prototype.listPresentationModelIds = function () {
                return this.presentationModels.keySet().slice(0);
            };

            ClientModelStore.prototype.listPresentationModels = function () {
                return this.presentationModels.values();
            };

            ClientModelStore.prototype.findPresentationModelById = function (id) {
                return this.presentationModels.get(id);
            };

            ClientModelStore.prototype.findAllPresentationModelByType = function (type) {
                if (!type || !this.presentationModelsPerType.containsKey(type)) {
                    return [];
                }
                return this.presentationModelsPerType.get(type).slice(0);
            };

            ClientModelStore.prototype.deleteAllPresentationModelOfType = function (presentationModelType) {
                var _this = this;
                var presentationModels = this.findAllPresentationModelByType(presentationModelType);
                presentationModels.forEach(function (pm) {
                    _this.deletePresentationModel(pm, false);
                });
                this.clientDolphin.getClientConnector().send(new dpmoftn.dolphin.DeletedAllPresentationModelsOfTypeNotification(presentationModelType), undefined);
            };

            ClientModelStore.prototype.deletePresentationModel = function (model, notify) {
                if (!model) {
                    return;
                }
                if (this.containsPresentationModel(model.id)) {
                    this.remove(model);
                    if (!notify || model.clientSideOnly) {
                        return;
                    }
                    this.clientDolphin.getClientConnector().send(new dpmn.dolphin.DeletedPresentationModelNotification(model.id), null);
                }
            };

            ClientModelStore.prototype.containsPresentationModel = function (id) {
                return this.presentationModels.containsKey(id);
            };

            ClientModelStore.prototype.addAttributeById = function (attribute) {
                if (!attribute || this.attributesPerId.containsKey(attribute.id)) {
                    return;
                }
                this.attributesPerId.put(attribute.id, attribute);
            };

            ClientModelStore.prototype.removeAttributeById = function (attribute) {
                if (!attribute || !this.attributesPerId.containsKey(attribute.id)) {
                    return;
                }
                this.attributesPerId.remove(attribute.id);
            };

            ClientModelStore.prototype.findAttributeById = function (id) {
                return this.attributesPerId.get(id);
            };

            ClientModelStore.prototype.addAttributeByQualifier = function (attribute) {
                if (!attribute || !attribute.getQualifier()) {
                    return;
                }
                var attributes = this.attributesPerQualifier.get(attribute.getQualifier());
                if (!attributes) {
                    attributes = [];
                    this.attributesPerQualifier.put(attribute.getQualifier(), attributes);
                }
                if (!(attributes.indexOf(attribute) > -1)) {
                    attributes.push(attribute);
                }
            };

            ClientModelStore.prototype.removeAttributeByQualifier = function (attribute) {
                if (!attribute || !attribute.getQualifier()) {
                    return;
                }
                var attributes = this.attributesPerQualifier.get(attribute.getQualifier());
                if (!attributes) {
                    return;
                }
                if (attributes.length > -1) {
                    attributes.splice(attributes.indexOf(attribute), 1);
                }
                if (attributes.length === 0) {
                    this.attributesPerQualifier.remove(attribute.getQualifier());
                }
            };

            ClientModelStore.prototype.findAllAttributesByQualifier = function (qualifier) {
                if (!qualifier || !this.attributesPerQualifier.containsKey(qualifier)) {
                    return [];
                }
                return this.attributesPerQualifier.get(qualifier).slice(0);
            };

            ClientModelStore.prototype.onModelStoreChange = function (eventHandler) {
                this.modelStoreChangeBus.onEvent(eventHandler);
            };
            return ClientModelStore;
        })();
        dolphin.ClientModelStore = ClientModelStore;
    })(exports.dolphin || (exports.dolphin = {}));
    var dolphin = exports.dolphin;
});
//# sourceMappingURL=ClientModelStore.js.map
;
define('Command',["require", "exports"], function(require, exports) {
    (function (dolphin) {
        var Command = (function () {
            function Command() {
                this.id = "dolphin-core-command";
            }
            return Command;
        })();
        dolphin.Command = Command;
    })(exports.dolphin || (exports.dolphin = {}));
    var dolphin = exports.dolphin;
});
//# sourceMappingURL=Command.js.map
;
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define('ValueChangedCommand',["require", "exports", "Command"], function(require, exports, __cmd__) {
    var cmd = __cmd__;
    (function (dolphin) {
        var ValueChangedCommand = (function (_super) {
            __extends(ValueChangedCommand, _super);
            function ValueChangedCommand(attributeId, oldValue, newValue) {
                _super.call(this);
                this.attributeId = attributeId;
                this.oldValue = oldValue;
                this.newValue = newValue;
                this.id = "ValueChanged";
                this.className = "org.opendolphin.core.comm.ValueChangedCommand";
            }
            return ValueChangedCommand;
        })(cmd.dolphin.Command);
        dolphin.ValueChangedCommand = ValueChangedCommand;
    })(exports.dolphin || (exports.dolphin = {}));
    var dolphin = exports.dolphin;
});
//# sourceMappingURL=ValueChangedCommand.js.map
;
define('CommandBatcher',["require", "exports", "ValueChangedCommand"], function(require, exports, __vcc__) {
    
    
    var vcc = __vcc__;
    
    

    (function (dolphin) {
        /** A Batcher that does no batching but merely takes the first element of the queue as the single item in the batch */
        var NoCommandBatcher = (function () {
            function NoCommandBatcher() {
            }
            NoCommandBatcher.prototype.batch = function (queue) {
                return [queue.shift()];
            };
            return NoCommandBatcher;
        })();
        dolphin.NoCommandBatcher = NoCommandBatcher;

        /** A batcher that batches the blinds (commands with no callback) and optionally also folds value changes */
        var BlindCommandBatcher = (function () {
            /** folding: whether we should try folding ValueChangedCommands */
            function BlindCommandBatcher(folding) {
                if (typeof folding === "undefined") { folding = true; }
                this.folding = folding;
            }
            BlindCommandBatcher.prototype.batch = function (queue) {
                var result = [];
                this.processNext(queue, result);
                return result;
            };

            // recursive impl method to side-effect both queue and batch
            BlindCommandBatcher.prototype.processNext = function (queue, batch) {
                if (queue.length < 1)
                    return;
                var candidate = queue.shift();

                if (this.folding && candidate.command instanceof vcc.dolphin.ValueChangedCommand && (!candidate.handler)) {
                    var found = null;
                    var canCmd = candidate.command;
                    for (var i = 0; i < batch.length && found == null; i++) {
                        if (batch[i].command instanceof vcc.dolphin.ValueChangedCommand) {
                            var batchCmd = batch[i].command;
                            if (canCmd.attributeId == batchCmd.attributeId && batchCmd.newValue == canCmd.oldValue) {
                                found = batchCmd;
                            }
                        }
                    }
                    if (found) {
                        found.newValue = canCmd.newValue;
                    } else {
                        batch.push(candidate);
                    }
                } else {
                    batch.push(candidate);
                }
                if (!candidate.handler && !(candidate.command['className'] == "org.opendolphin.core.comm.NamedCommand") && !(candidate.command['className'] == "org.opendolphin.core.comm.EmptyNotification")) {
                    this.processNext(queue, batch);
                }
            };
            return BlindCommandBatcher;
        })();
        dolphin.BlindCommandBatcher = BlindCommandBatcher;
    })(exports.dolphin || (exports.dolphin = {}));
    var dolphin = exports.dolphin;
});
//# sourceMappingURL=CommandBatcher.js.map
;
define('Codec',["require", "exports"], function(require, exports) {
    (function (dolphin) {
        var Codec = (function () {
            function Codec() {
            }
            Codec.prototype.encode = function (commands) {
                return JSON.stringify(commands);
            };

            Codec.prototype.decode = function (transmitted) {
                if (typeof transmitted == 'string') {
                    return JSON.parse(transmitted);
                } else {
                    return transmitted;
                }
            };
            return Codec;
        })();
        dolphin.Codec = Codec;
    })(exports.dolphin || (exports.dolphin = {}));
    var dolphin = exports.dolphin;
});
//# sourceMappingURL=Codec.js.map
;
define('Tag',["require", "exports"], function(require, exports) {
    (function (dolphin) {
        var Tag = (function () {
            function Tag() {
            }
            Tag.value = function () {
                return "VALUE";
            };

            Tag.label = function () {
                return "LABEL";
            };

            Tag.tooltip = function () {
                return "TOOLTIP";
            };

            Tag.mandatory = function () {
                return "MANDATORY";
            };

            Tag.visible = function () {
                return "VISIBLE";
            };

            Tag.enabled = function () {
                return "ENABLED";
            };

            Tag.regex = function () {
                return "REGEX";
            };

            Tag.widgetHint = function () {
                return "WIDGET_HINT";
            };

            Tag.valueType = function () {
                return "VALUE_TYPE";
            };
            return Tag;
        })();
        dolphin.Tag = Tag;
    })(exports.dolphin || (exports.dolphin = {}));
    var dolphin = exports.dolphin;
});
//# sourceMappingURL=Tag.js.map
;
define('ClientConnector',["require", "exports", "ClientPresentationModel", "CommandBatcher", "Codec", "ClientAttribute", "Tag"], function(require, exports, __cpm__, __cb__, __cod__, __ca__, __tags__) {
    var cpm = __cpm__;
    
    var cb = __cb__;
    var cod = __cod__;
    
    
    
    var ca = __ca__;
    
    
    
    
    
    
    
    
    
    
    
    
    
    var tags = __tags__;

    (function (dolphin) {
        var ClientConnector = (function () {
            function ClientConnector(transmitter, clientDolphin, slackMS) {
                if (typeof slackMS === "undefined") { slackMS = 0; }
                this.commandQueue = [];
                this.currentlySending = false;
                this.commandBatcher = new cb.dolphin.BlindCommandBatcher(true);
                this.pushEnabled = false;
                this.waiting = false;
                this.transmitter = transmitter;
                this.clientDolphin = clientDolphin;
                this.slackMS = slackMS;
                this.codec = new cod.dolphin.Codec();
            }
            ClientConnector.prototype.setCommandBatcher = function (newBatcher) {
                this.commandBatcher = newBatcher;
            };
            ClientConnector.prototype.setPushEnabled = function (enabled) {
                this.pushEnabled = enabled;
            };
            ClientConnector.prototype.setPushListener = function (newListener) {
                this.pushListener = newListener;
            };
            ClientConnector.prototype.setReleaseCommand = function (newCommand) {
                this.releaseCommand = newCommand;
            };

            ClientConnector.prototype.send = function (command, onFinished) {
                this.commandQueue.push({ command: command, handler: onFinished });
                if (this.currentlySending) {
                    if (command != this.pushListener)
                        this.release();
                    return;
                }
                this.doSendNext();
            };

            ClientConnector.prototype.doSendNext = function () {
                var _this = this;
                if (this.commandQueue.length < 1) {
                    this.currentlySending = false;
                    return;
                }
                this.currentlySending = true;

                var cmdsAndHandlers = this.commandBatcher.batch(this.commandQueue);
                var callback = cmdsAndHandlers[cmdsAndHandlers.length - 1].handler;
                var commands = cmdsAndHandlers.map(function (cah) {
                    return cah.command;
                });
                this.transmitter.transmit(commands, function (response) {
                    //console.log("server response: [" + response.map(it => it.id).join(", ") + "] ");
                    var touchedPMs = [];
                    response.forEach(function (command) {
                        var touched = _this.handle(command);
                        if (touched)
                            touchedPMs.push(touched);
                    });

                    if (callback) {
                        callback.onFinished(touchedPMs);
                        // todo dk: handling of data from datacommand
                    }

                    // recursive call: fetch the next in line but allow a bit of slack such that
                    // document events can fire, rendering is done and commands can batch up
                    setTimeout(function () {
                        return _this.doSendNext();
                    }, _this.slackMS);
                });
            };

            ClientConnector.prototype.handle = function (command) {
                if (command.id == "Data") {
                    return this.handleDataCommand(command);
                } else if (command.id == "DeletePresentationModel") {
                    return this.handleDeletePresentationModelCommand(command);
                } else if (command.id == "DeleteAllPresentationModelsOfType") {
                    return this.handleDeleteAllPresentationModelOfTypeCommand(command);
                } else if (command.id == "CreatePresentationModel") {
                    return this.handleCreatePresentationModelCommand(command);
                } else if (command.id == "ValueChanged") {
                    return this.handleValueChangedCommand(command);
                } else if (command.id == "BaseValueChanged") {
                    return this.handleBaseValueChangedCommand(command);
                } else if (command.id == "SwitchPresentationModel") {
                    return this.handleSwitchPresentationModelCommand(command);
                } else if (command.id == "InitializeAttribute") {
                    return this.handleInitializeAttributeCommand(command);
                } else if (command.id == "SavedPresentationModel") {
                    return this.handleSavedPresentationModelNotification(command);
                } else if (command.id == "PresentationModelReseted") {
                    return this.handlePresentationModelResetedCommand(command);
                } else if (command.id == "AttributeMetadataChanged") {
                    return this.handleAttributeMetadataChangedCommand(command);
                } else if (command.id == "CallNamedAction") {
                    return this.handleCallNamedActionCommand(command);
                } else {
                    console.log("Cannot handle, unknown command " + command);
                }

                return null;
            };
            ClientConnector.prototype.handleDataCommand = function (serverCommand) {
                return serverCommand.data;
            };
            ClientConnector.prototype.handleDeletePresentationModelCommand = function (serverCommand) {
                var model = this.clientDolphin.findPresentationModelById(serverCommand.pmId);
                if (!model)
                    return null;
                this.clientDolphin.getClientModelStore().deletePresentationModel(model, true);
                return model;
            };
            ClientConnector.prototype.handleDeleteAllPresentationModelOfTypeCommand = function (serverCommand) {
                this.clientDolphin.deleteAllPresentationModelOfType(serverCommand.pmType);
                return null;
            };
            ClientConnector.prototype.handleCreatePresentationModelCommand = function (serverCommand) {
                var _this = this;
                if (this.clientDolphin.getClientModelStore().containsPresentationModel(serverCommand.pmId)) {
                    throw new Error("There already is a presentation model with id " + serverCommand.pmId + "  known to the client.");
                }
                var attributes = [];
                serverCommand.attributes.forEach(function (attr) {
                    var clientAttribute = _this.clientDolphin.attribute(attr.propertyName, attr.qualifier, attr.value, attr.tag ? attr.tag : tags.dolphin.Tag.value());
                    clientAttribute.setBaseValue(attr.baseValue);
                    if (attr.id && attr.id.match(".*S$")) {
                        clientAttribute.id = attr.id;
                    }
                    attributes.push(clientAttribute);
                });
                var clientPm = new cpm.dolphin.ClientPresentationModel(serverCommand.pmId, serverCommand.pmType);
                clientPm.addAttributes(attributes);
                if (serverCommand.clientSideOnly) {
                    clientPm.clientSideOnly = true;
                }
                this.clientDolphin.getClientModelStore().add(clientPm);
                this.clientDolphin.updatePresentationModelQualifier(clientPm);
                clientPm.updateAttributeDirtyness();
                clientPm.updateDirty();
                return clientPm;
            };
            ClientConnector.prototype.handleValueChangedCommand = function (serverCommand) {
                var clientAttribute = this.clientDolphin.getClientModelStore().findAttributeById(serverCommand.attributeId);
                if (!clientAttribute) {
                    console.log("attribute with id " + serverCommand.attributeId + " not found, cannot update old value " + serverCommand.oldValue + " to new value " + serverCommand.newValue);
                    return null;
                }
                if (clientAttribute.getValue() == serverCommand.newValue) {
                    //console.log("nothing to do. new value == old value");
                    return null;
                }
                if (clientAttribute.getValue() != serverCommand.oldValue) {
                    //                todo dk: think about sending a RejectCommand here to tell the server about a possible lost update
                    console.log("attribute with id " + serverCommand.attributeId + " and value " + clientAttribute.getValue() + " cannot be set to value " + serverCommand.newValue + " because the change was based on an outdated old value of " + serverCommand.oldValue);
                    return null;
                }
                clientAttribute.setValue(serverCommand.newValue);
                return null;
            };
            ClientConnector.prototype.handleBaseValueChangedCommand = function (serverCommand) {
                var clientAttribute = this.clientDolphin.getClientModelStore().findAttributeById(serverCommand.attributeId);
                if (!clientAttribute) {
                    console.log("attribute with id " + serverCommand.attributeId + " not found, cannot set base value.");
                    return null;
                }
                clientAttribute.rebase();
                return null;
            };
            ClientConnector.prototype.handleSwitchPresentationModelCommand = function (serverCommand) {
                var switchPm = this.clientDolphin.getClientModelStore().findPresentationModelById(serverCommand.pmId);
                if (!switchPm) {
                    console.log("switch model with id " + serverCommand.pmId + " not found, cannot switch.");
                    return null;
                }
                var sourcePm = this.clientDolphin.getClientModelStore().findPresentationModelById(serverCommand.sourcePmId);
                if (!sourcePm) {
                    console.log("source model with id " + serverCommand.sourcePmId + " not found, cannot switch.");
                    return null;
                }
                switchPm.syncWith(sourcePm);
                return switchPm;
            };
            ClientConnector.prototype.handleInitializeAttributeCommand = function (serverCommand) {
                var attribute = new ca.dolphin.ClientAttribute(serverCommand.propertyName, serverCommand.qualifier, serverCommand.newValue, serverCommand.tag);
                if (serverCommand.qualifier) {
                    var attributesCopy = this.clientDolphin.getClientModelStore().findAllAttributesByQualifier(serverCommand.qualifier);
                    if (attributesCopy) {
                        if (!serverCommand.newValue) {
                            var attr = attributesCopy.shift();
                            if (attr) {
                                attribute.setValue(attr.getValue());
                            }
                        } else {
                            attributesCopy.forEach(function (attr) {
                                attr.setValue(attribute.getValue());
                            });
                        }
                    }
                }
                var presentationModel;
                if (serverCommand.pmId) {
                    presentationModel = this.clientDolphin.getClientModelStore().findPresentationModelById(serverCommand.pmId);
                }
                if (!presentationModel) {
                    presentationModel = new cpm.dolphin.ClientPresentationModel(serverCommand.pmId, serverCommand.pmType);
                    this.clientDolphin.getClientModelStore().add(presentationModel);
                }
                this.clientDolphin.addAttributeToModel(presentationModel, attribute);
                this.clientDolphin.updatePresentationModelQualifier(presentationModel);
                return presentationModel;
            };
            ClientConnector.prototype.handleSavedPresentationModelNotification = function (serverCommand) {
                if (!serverCommand.pmId)
                    return null;
                var model = this.clientDolphin.getClientModelStore().findPresentationModelById(serverCommand.pmId);
                if (!model) {
                    console.log("model with id " + serverCommand.pmId + " not found, cannot rebase.");
                    return null;
                }
                model.rebase();
                return model;
            };
            ClientConnector.prototype.handlePresentationModelResetedCommand = function (serverCommand) {
                if (!serverCommand.pmId)
                    return null;
                var model = this.clientDolphin.getClientModelStore().findPresentationModelById(serverCommand.pmId);
                if (!model) {
                    console.log("model with id " + serverCommand.pmId + " not found, cannot reset.");
                    return null;
                }
                model.reset();
                return model;
            };
            ClientConnector.prototype.handleAttributeMetadataChangedCommand = function (serverCommand) {
                var clientAttribute = this.clientDolphin.getClientModelStore().findAttributeById(serverCommand.attributeId);
                if (!clientAttribute)
                    return null;
                clientAttribute[serverCommand.metadataName] = serverCommand.value;
                return null;
            };
            ClientConnector.prototype.handleCallNamedActionCommand = function (serverCommand) {
                this.clientDolphin.send(serverCommand.actionName, null);
                return null;
            };

            ///////////// push support ///////////////
            ClientConnector.prototype.listen = function () {
                if (!this.pushEnabled)
                    return;
                if (this.waiting)
                    return;

                // todo: how to issue a warning if no pushListener is set?
                this.waiting = true;
                var me = this;
                this.send(this.pushListener, {
                    onFinished: function (models) {
                        me.waiting = false;
                        me.listen();
                    },
                    onFinishedData: null
                });
            };

            ClientConnector.prototype.release = function () {
                if (!this.waiting)
                    return;
                this.waiting = false;

                // todo: how to issue a warning if no releaseCommand is set?
                this.transmitter.signal(this.releaseCommand);
            };
            return ClientConnector;
        })();
        dolphin.ClientConnector = ClientConnector;
    })(exports.dolphin || (exports.dolphin = {}));
    var dolphin = exports.dolphin;
});
//# sourceMappingURL=ClientConnector.js.map
;
define('NoTransmitter',["require", "exports"], function(require, exports) {
    
    
    
    (function (dolphin) {
        /**
        * A transmitter that is not transmitting at all.
        * It may serve as a stand-in when no real transmitter is needed.
        */
        var NoTransmitter = (function () {
            function NoTransmitter() {
            }
            NoTransmitter.prototype.transmit = function (commands, onDone) {
                // do nothing special
                onDone([]);
            };

            NoTransmitter.prototype.signal = function (command) {
                // do nothing
            };
            return NoTransmitter;
        })();
        dolphin.NoTransmitter = NoTransmitter;
    })(exports.dolphin || (exports.dolphin = {}));
    var dolphin = exports.dolphin;
});
//# sourceMappingURL=NoTransmitter.js.map
;
define('HttpTransmitter',["require", "exports", "Codec"], function(require, exports, __cod__) {
    
    
    
    var cod = __cod__;

    (function (dolphin) {
        var HttpTransmitter = (function () {
            function HttpTransmitter(url, reset) {
                if (typeof reset === "undefined") { reset = true; }
                this.url = url;
                this.http = new XMLHttpRequest();

                //            this.http.withCredentials = true; // not supported in all browsers
                this.codec = new cod.dolphin.Codec();
                if (reset) {
                    this.invalidate();
                }
            }
            HttpTransmitter.prototype.transmit = function (commands, onDone) {
                var _this = this;
                this.http.onerror = function (evt) {
                    alert("could not fetch " + _this.url + ", message: " + evt.message);
                    onDone([]);
                };

                this.http.onloadend = function (evt) {
                    var responseText = _this.http.responseText;
                    var responseCommands = _this.codec.decode(responseText);
                    onDone(responseCommands);
                };

                this.http.open('POST', this.url, true);
                this.http.send(this.codec.encode(commands));
            };

            HttpTransmitter.prototype.signal = function (command) {
                var sig = new XMLHttpRequest();
                sig.open('POST', this.url, true);
                sig.send(this.codec.encode([command]));
            };

            HttpTransmitter.prototype.invalidate = function () {
                this.http.open('POST', this.url + 'invalidate?', false);
                this.http.send();
            };
            return HttpTransmitter;
        })();
        dolphin.HttpTransmitter = HttpTransmitter;
    })(exports.dolphin || (exports.dolphin = {}));
    var dolphin = exports.dolphin;
});
//# sourceMappingURL=HttpTransmitter.js.map
;
define('opendolphin',["require", "exports", 'ClientDolphin', 'ClientModelStore', 'ClientConnector', 'NoTransmitter', 'HttpTransmitter'], function(require, exports, __dol__, __mst__, __cc__, __ntm__, __htm__) {
    
    var dol = __dol__;
    var mst = __mst__;
    var cc = __cc__;
    var ntm = __ntm__;
    var htm = __htm__;

    /**
    * JS-friendly facade to avoid too many dependencies in plain JS code.
    * The name of this file is also used for the initial lookup of the
    * one javascript file that contains all the dolphin code.
    * Changing the name requires the build support and all users
    * to be updated as well.
    * Dierk Koenig
    */
    // factory method for the initialized dolphin
    function dolphin(url, reset, slackMS) {
        if (typeof slackMS === "undefined") { slackMS = 300; }
        var dolphin = new dol.dolphin.ClientDolphin();
        var transmitter;
        if (url != null && url.length > 0) {
            transmitter = new htm.dolphin.HttpTransmitter(url, reset);
        } else {
            transmitter = new ntm.dolphin.NoTransmitter();
        }
        dolphin.setClientConnector(new cc.dolphin.ClientConnector(transmitter, dolphin, slackMS));
        dolphin.setClientModelStore(new mst.dolphin.ClientModelStore(dolphin));
        return dolphin;
    }
    exports.dolphin = dolphin;
});
//# sourceMappingURL=OpenDolphin.js.map
;
