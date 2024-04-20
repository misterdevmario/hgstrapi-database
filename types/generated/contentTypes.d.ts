import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesRelease extends Schema.CollectionType {
  collectionName: 'strapi_releases';
  info: {
    singularName: 'release';
    pluralName: 'releases';
    displayName: 'Release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    releasedAt: Attribute.DateTime;
    actions: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Schema.CollectionType {
  collectionName: 'strapi_release_actions';
  info: {
    singularName: 'release-action';
    pluralName: 'release-actions';
    displayName: 'Release Action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    type: Attribute.Enumeration<['publish', 'unpublish']> & Attribute.Required;
    entry: Attribute.Relation<
      'plugin::content-releases.release-action',
      'morphToOne'
    >;
    contentType: Attribute.String & Attribute.Required;
    release: Attribute.Relation<
      'plugin::content-releases.release-action',
      'manyToOne',
      'plugin::content-releases.release'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<{
        min: 1;
        max: 50;
      }>;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiActivitiesgalleryActivitiesgallery
  extends Schema.CollectionType {
  collectionName: 'activitiesgalleries';
  info: {
    singularName: 'activitiesgallery';
    pluralName: 'activitiesgalleries';
    displayName: 'activitiesgallery';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    activity: Attribute.Media;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::activitiesgallery.activitiesgallery',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::activitiesgallery.activitiesgallery',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiActivityfridayActivityfriday extends Schema.CollectionType {
  collectionName: 'activityfridays';
  info: {
    singularName: 'activityfriday';
    pluralName: 'activityfridays';
    displayName: 'activityfriday';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    activitieEs: Attribute.String;
    spotEn: Attribute.String;
    spotEs: Attribute.String;
    activitieEn: Attribute.String;
    activitieImage: Attribute.String;
    hourStart: Attribute.String;
    hourEnd: Attribute.String;
    descEn: Attribute.Text;
    descEs: Attribute.Text;
    color: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::activityfriday.activityfriday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::activityfriday.activityfriday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiActivitymondayActivitymonday extends Schema.CollectionType {
  collectionName: 'activitymondays';
  info: {
    singularName: 'activitymonday';
    pluralName: 'activitymondays';
    displayName: 'activitymonday';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    activitieEs: Attribute.String;
    spotEn: Attribute.String;
    spotEs: Attribute.String;
    activitieEn: Attribute.String;
    activitieImage: Attribute.String;
    hourStart: Attribute.String;
    hourEnd: Attribute.String;
    descEn: Attribute.Text;
    descEs: Attribute.Text;
    color: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::activitymonday.activitymonday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::activitymonday.activitymonday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiActivitysaturdayActivitysaturday
  extends Schema.CollectionType {
  collectionName: 'activitysaturdays';
  info: {
    singularName: 'activitysaturday';
    pluralName: 'activitysaturdays';
    displayName: 'activitysaturday';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    activitieEs: Attribute.String;
    spotEn: Attribute.String;
    spotEs: Attribute.String;
    activitieEn: Attribute.String;
    activitieImage: Attribute.String;
    hourStart: Attribute.String;
    hourEnd: Attribute.String;
    descEn: Attribute.Text;
    descEs: Attribute.Text;
    color: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::activitysaturday.activitysaturday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::activitysaturday.activitysaturday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiActivitysundayActivitysunday extends Schema.CollectionType {
  collectionName: 'activitysundays';
  info: {
    singularName: 'activitysunday';
    pluralName: 'activitysundays';
    displayName: 'activitysunday';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    activitieEs: Attribute.String;
    spotEn: Attribute.String;
    spotEs: Attribute.String;
    activitieEn: Attribute.String;
    activitieImage: Attribute.String;
    hourStart: Attribute.String;
    hourEnd: Attribute.String;
    descEn: Attribute.Text;
    descEs: Attribute.String;
    color: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::activitysunday.activitysunday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::activitysunday.activitysunday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiActivitythursdayActivitythursday
  extends Schema.CollectionType {
  collectionName: 'activitythursdays';
  info: {
    singularName: 'activitythursday';
    pluralName: 'activitythursdays';
    displayName: 'activitythursday';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    activitieEs: Attribute.String;
    spotEn: Attribute.String;
    spotEs: Attribute.String;
    activitieEn: Attribute.String;
    activitieImage: Attribute.String;
    hourStart: Attribute.String;
    hourEnd: Attribute.String;
    descEn: Attribute.Text;
    descEs: Attribute.Text;
    color: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::activitythursday.activitythursday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::activitythursday.activitythursday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiActivitytuesdayActivitytuesday
  extends Schema.CollectionType {
  collectionName: 'activitytuesdays';
  info: {
    singularName: 'activitytuesday';
    pluralName: 'activitytuesdays';
    displayName: 'activitytuesday';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    activitieEs: Attribute.String;
    spotEn: Attribute.String;
    spotEs: Attribute.String;
    activitieEn: Attribute.String;
    activitieImage: Attribute.String;
    hourStart: Attribute.String;
    hourEnd: Attribute.String;
    descEn: Attribute.Text;
    descEs: Attribute.Text;
    color: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::activitytuesday.activitytuesday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::activitytuesday.activitytuesday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiActivitywednesdayActivitywednesday
  extends Schema.CollectionType {
  collectionName: 'activitywednesdays';
  info: {
    singularName: 'activitywednesday';
    pluralName: 'activitywednesdays';
    displayName: 'activitywednesday';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    activitieEs: Attribute.String;
    spotEn: Attribute.String;
    spotEs: Attribute.String;
    activitieEn: Attribute.String;
    activitieImage: Attribute.String;
    hourStart: Attribute.String;
    hourEnd: Attribute.String;
    descEn: Attribute.Text;
    descEs: Attribute.Text;
    color: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::activitywednesday.activitywednesday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::activitywednesday.activitywednesday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBarfridayBarfriday extends Schema.CollectionType {
  collectionName: 'barfridays';
  info: {
    singularName: 'barfriday';
    pluralName: 'barfridays';
    displayName: 'barfriday';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    hourStart: Attribute.String;
    hourEnd: Attribute.String;
    barImg: Attribute.String;
    descEn: Attribute.Text;
    descEs: Attribute.Text;
    menuImgEn: Attribute.String;
    menuImgEs: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::barfriday.barfriday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::barfriday.barfriday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBarmondayBarmonday extends Schema.CollectionType {
  collectionName: 'barmondays';
  info: {
    singularName: 'barmonday';
    pluralName: 'barmondays';
    displayName: 'barmonday';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    hourStart: Attribute.String;
    hourEnd: Attribute.String;
    barImg: Attribute.String;
    descEn: Attribute.Text;
    descEs: Attribute.Text;
    menuImgEn: Attribute.String;
    menuImgEs: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::barmonday.barmonday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::barmonday.barmonday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBarsaturdayBarsaturday extends Schema.CollectionType {
  collectionName: 'barsaturdays';
  info: {
    singularName: 'barsaturday';
    pluralName: 'barsaturdays';
    displayName: 'barsaturday';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    hourStart: Attribute.String;
    hourEnd: Attribute.String;
    barImg: Attribute.String;
    descEn: Attribute.Text;
    descEs: Attribute.Text;
    menuImgEs: Attribute.String;
    menuImgEn: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::barsaturday.barsaturday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::barsaturday.barsaturday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBarsundayBarsunday extends Schema.CollectionType {
  collectionName: 'barsundays';
  info: {
    singularName: 'barsunday';
    pluralName: 'barsundays';
    displayName: 'barsunday';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    hourStart: Attribute.String;
    hourEnd: Attribute.String;
    barImg: Attribute.String;
    descEn: Attribute.Text;
    descEs: Attribute.Text;
    menuImgEn: Attribute.String;
    menuImgEs: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::barsunday.barsunday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::barsunday.barsunday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBarthursdayBarthursday extends Schema.CollectionType {
  collectionName: 'barthursdays';
  info: {
    singularName: 'barthursday';
    pluralName: 'barthursdays';
    displayName: 'barthursday';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    hourStart: Attribute.String;
    hourEnd: Attribute.String;
    barImg: Attribute.String;
    descEn: Attribute.Text;
    descEs: Attribute.Text;
    menuImgEn: Attribute.String;
    menuImgEs: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::barthursday.barthursday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::barthursday.barthursday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBartuestadyBartuestady extends Schema.CollectionType {
  collectionName: 'bartuestadies';
  info: {
    singularName: 'bartuestady';
    pluralName: 'bartuestadies';
    displayName: 'bartuesday';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    hourStart: Attribute.String;
    hourEnd: Attribute.String;
    barImg: Attribute.String;
    descEn: Attribute.Text;
    descEs: Attribute.Text;
    menuImgEn: Attribute.String;
    menuImgEs: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::bartuestady.bartuestady',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::bartuestady.bartuestady',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBarwednesdayBarwednesday extends Schema.CollectionType {
  collectionName: 'barwednesdays';
  info: {
    singularName: 'barwednesday';
    pluralName: 'barwednesdays';
    displayName: 'barwednesday';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    hourStart: Attribute.String;
    hourEnd: Attribute.String;
    barImg: Attribute.String;
    descEn: Attribute.Text;
    descEs: Attribute.Text;
    menuImgEn: Attribute.String;
    menuImgEs: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::barwednesday.barwednesday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::barwednesday.barwednesday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBreakfastfridayBreakfastfriday
  extends Schema.CollectionType {
  collectionName: 'breakfastfridays';
  info: {
    singularName: 'breakfastfriday';
    pluralName: 'breakfastfridays';
    displayName: 'breakfastfriday';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    typeEn: Attribute.String;
    serviceEn: Attribute.String;
    hourStart: Attribute.String;
    hourEnd: Attribute.String;
    membersEn: Attribute.String;
    name: Attribute.String;
    breakfastImg: Attribute.String;
    typeEs: Attribute.String;
    serviceEs: Attribute.String;
    membersEs: Attribute.String;
    descEn: Attribute.Text;
    descEs: Attribute.Text;
    menuImgEn: Attribute.String;
    menuImgEs: Attribute.String;
    menus: Attribute.JSON;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::breakfastfriday.breakfastfriday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::breakfastfriday.breakfastfriday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBreakfastmondayBreakfastmonday
  extends Schema.CollectionType {
  collectionName: 'breakfastmondays';
  info: {
    singularName: 'breakfastmonday';
    pluralName: 'breakfastmondays';
    displayName: 'breakfastmonday';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    typeEn: Attribute.String;
    serviceEn: Attribute.String;
    hourStart: Attribute.String;
    hourEnd: Attribute.String;
    membersEn: Attribute.String;
    name: Attribute.String;
    breakfastImg: Attribute.String;
    typeEs: Attribute.String;
    serviceEs: Attribute.String;
    membersEs: Attribute.String;
    descEn: Attribute.Text;
    descEs: Attribute.Text;
    menuImgEn: Attribute.String;
    menuImgEs: Attribute.String;
    menus: Attribute.JSON;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::breakfastmonday.breakfastmonday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::breakfastmonday.breakfastmonday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBreakfastsaturdayBreakfastsaturday
  extends Schema.CollectionType {
  collectionName: 'breakfastsaturdays';
  info: {
    singularName: 'breakfastsaturday';
    pluralName: 'breakfastsaturdays';
    displayName: 'breakfastsaturday';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    typeEn: Attribute.String;
    serviceEn: Attribute.String;
    hourStart: Attribute.String;
    hourEnd: Attribute.String;
    membersEn: Attribute.String;
    name: Attribute.String;
    breakfastImg: Attribute.String;
    typeEs: Attribute.String;
    serviceEs: Attribute.String;
    membersEs: Attribute.String;
    descEn: Attribute.Text;
    descEs: Attribute.Text;
    menuImgEn: Attribute.String;
    menuImgEs: Attribute.String;
    menus: Attribute.JSON;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::breakfastsaturday.breakfastsaturday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::breakfastsaturday.breakfastsaturday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBreakfastsundayBreakfastsunday
  extends Schema.CollectionType {
  collectionName: 'breakfastsundays';
  info: {
    singularName: 'breakfastsunday';
    pluralName: 'breakfastsundays';
    displayName: 'breakfastsunday';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    typeEn: Attribute.String;
    serviceEn: Attribute.String;
    hourStart: Attribute.String;
    hourEnd: Attribute.String;
    membersEn: Attribute.String;
    name: Attribute.String;
    breakfastImg: Attribute.String;
    typeEs: Attribute.String;
    serviceEs: Attribute.String;
    membersEs: Attribute.String;
    descEn: Attribute.Text;
    descEs: Attribute.Text;
    menuImgEn: Attribute.String;
    menuImgEs: Attribute.String;
    menus: Attribute.JSON;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::breakfastsunday.breakfastsunday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::breakfastsunday.breakfastsunday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBreakfastthursdayBreakfastthursday
  extends Schema.CollectionType {
  collectionName: 'breakfastthursdays';
  info: {
    singularName: 'breakfastthursday';
    pluralName: 'breakfastthursdays';
    displayName: 'breakfastthursday';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    typeEn: Attribute.String;
    serviceEn: Attribute.String;
    hourStart: Attribute.String;
    hourEnd: Attribute.String;
    membersEn: Attribute.String;
    name: Attribute.String;
    breakfastImg: Attribute.String;
    typeEs: Attribute.String;
    serviceEs: Attribute.String;
    membersEs: Attribute.String;
    descEn: Attribute.Text;
    descEs: Attribute.Text;
    menuImgEn: Attribute.String;
    menuImgEs: Attribute.String;
    menus: Attribute.JSON;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::breakfastthursday.breakfastthursday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::breakfastthursday.breakfastthursday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBreakfasttuesdayBreakfasttuesday
  extends Schema.CollectionType {
  collectionName: 'breakfasttuesdays';
  info: {
    singularName: 'breakfasttuesday';
    pluralName: 'breakfasttuesdays';
    displayName: 'breakfasttuesday';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    typeEn: Attribute.String;
    serviceEn: Attribute.String;
    hourStart: Attribute.String;
    hourEnd: Attribute.String;
    membersEn: Attribute.String;
    name: Attribute.String;
    breakfastImg: Attribute.String;
    typeEs: Attribute.String;
    serviceEs: Attribute.String;
    membersEs: Attribute.String;
    descEn: Attribute.Text;
    descEs: Attribute.Text;
    menuImgEn: Attribute.String;
    menuImgEs: Attribute.String;
    menus: Attribute.JSON;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::breakfasttuesday.breakfasttuesday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::breakfasttuesday.breakfasttuesday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBreakfastwednesdayBreakfastwednesday
  extends Schema.CollectionType {
  collectionName: 'breakfastwednesdays';
  info: {
    singularName: 'breakfastwednesday';
    pluralName: 'breakfastwednesdays';
    displayName: 'breakfastwednesday';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    typeEn: Attribute.String;
    serviceEn: Attribute.String;
    hourStart: Attribute.String;
    hourEnd: Attribute.String;
    membersEn: Attribute.String;
    name: Attribute.String;
    breakfastImg: Attribute.String;
    typeEs: Attribute.String;
    serviceEs: Attribute.String;
    membersEs: Attribute.String;
    descEn: Attribute.Text;
    descEs: Attribute.Text;
    menuImgEn: Attribute.String;
    menuImgEs: Attribute.String;
    menus: Attribute.JSON;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::breakfastwednesday.breakfastwednesday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::breakfastwednesday.breakfastwednesday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDiningfridayDiningfriday extends Schema.CollectionType {
  collectionName: 'diningfridays';
  info: {
    singularName: 'diningfriday';
    pluralName: 'diningfridays';
    displayName: 'diningfriday';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    typeEn: Attribute.String;
    serviceEn: Attribute.String;
    hourStart: Attribute.String;
    hourEnd: Attribute.String;
    membersEn: Attribute.String;
    name: Attribute.String;
    diningImg: Attribute.String;
    serviceEs: Attribute.String;
    typeEs: Attribute.String;
    membersEs: Attribute.String;
    descEn: Attribute.Text;
    descEs: Attribute.Text;
    menuImgEn: Attribute.String;
    menuImgEs: Attribute.String;
    menus: Attribute.JSON;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::diningfriday.diningfriday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::diningfriday.diningfriday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDiningmondayDiningmonday extends Schema.CollectionType {
  collectionName: 'diningmondays';
  info: {
    singularName: 'diningmonday';
    pluralName: 'diningmondays';
    displayName: 'diningmonday';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    typeEn: Attribute.String;
    serviceEn: Attribute.String;
    hourStart: Attribute.String;
    hourEnd: Attribute.String;
    membersEn: Attribute.String;
    name: Attribute.String;
    diningImg: Attribute.String;
    serviceEs: Attribute.String;
    typeEs: Attribute.String;
    membersEs: Attribute.String;
    descEn: Attribute.Text;
    descEs: Attribute.Text;
    menuImgEn: Attribute.String;
    menuImgEs: Attribute.String;
    menus: Attribute.JSON;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::diningmonday.diningmonday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::diningmonday.diningmonday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDiningsaturdayDiningsaturday extends Schema.CollectionType {
  collectionName: 'diningsaturdays';
  info: {
    singularName: 'diningsaturday';
    pluralName: 'diningsaturdays';
    displayName: 'diningsaturday';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    typeEn: Attribute.String;
    serviceEn: Attribute.String;
    hourStart: Attribute.String;
    hourEnd: Attribute.String;
    membersEn: Attribute.String;
    name: Attribute.String;
    diningImg: Attribute.String;
    serviceEs: Attribute.String;
    typeEs: Attribute.String;
    membersEs: Attribute.String;
    descEn: Attribute.Text;
    descEs: Attribute.Text;
    menuImgEn: Attribute.String;
    menuImgEs: Attribute.String;
    menus: Attribute.JSON;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::diningsaturday.diningsaturday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::diningsaturday.diningsaturday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDiningsundayDiningsunday extends Schema.CollectionType {
  collectionName: 'diningsundays';
  info: {
    singularName: 'diningsunday';
    pluralName: 'diningsundays';
    displayName: 'diningsunday';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    typeEn: Attribute.String;
    serviceEn: Attribute.String;
    hourStart: Attribute.String;
    hourEnd: Attribute.String;
    membersEn: Attribute.String;
    name: Attribute.String;
    diningImg: Attribute.String;
    serviceEs: Attribute.String;
    typeEs: Attribute.String;
    membersEs: Attribute.String;
    descEn: Attribute.Text;
    descEs: Attribute.Text;
    menuImgEn: Attribute.String;
    menuImgEs: Attribute.String;
    menus: Attribute.JSON;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::diningsunday.diningsunday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::diningsunday.diningsunday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDiningthursdayDiningthursday extends Schema.CollectionType {
  collectionName: 'diningthursdays';
  info: {
    singularName: 'diningthursday';
    pluralName: 'diningthursdays';
    displayName: 'diningthursday';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    typeEn: Attribute.String;
    serviceEn: Attribute.String;
    hourStart: Attribute.String;
    hourEnd: Attribute.String;
    membersEn: Attribute.String;
    name: Attribute.String;
    diningImg: Attribute.String;
    serviceEs: Attribute.String;
    typeEs: Attribute.String;
    membersEs: Attribute.String;
    descEn: Attribute.Text;
    descEs: Attribute.Text;
    menuImgEn: Attribute.String;
    menuImgEs: Attribute.String;
    menus: Attribute.JSON;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::diningthursday.diningthursday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::diningthursday.diningthursday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDiningtuesdayDiningtuesday extends Schema.CollectionType {
  collectionName: 'diningtuesdays';
  info: {
    singularName: 'diningtuesday';
    pluralName: 'diningtuesdays';
    displayName: 'diningtuesday';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    typeEn: Attribute.String;
    serviceEn: Attribute.String;
    hourStart: Attribute.String;
    hourEnd: Attribute.String;
    membersEn: Attribute.String;
    name: Attribute.String;
    diningImg: Attribute.String;
    serviceEs: Attribute.String;
    typeEs: Attribute.String;
    membersEs: Attribute.String;
    descEn: Attribute.Text;
    descEs: Attribute.Text;
    menuImgEn: Attribute.String;
    menuImgEs: Attribute.String;
    menus: Attribute.JSON;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::diningtuesday.diningtuesday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::diningtuesday.diningtuesday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDiningwednesdayDiningwednesday
  extends Schema.CollectionType {
  collectionName: 'diningwednesdays';
  info: {
    singularName: 'diningwednesday';
    pluralName: 'diningwednesdays';
    displayName: 'diningwednesday';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    typeEn: Attribute.String;
    serviceEn: Attribute.String;
    hourStart: Attribute.String;
    hourEnd: Attribute.String;
    membersEn: Attribute.String;
    name: Attribute.String;
    diningImg: Attribute.String;
    serviceEs: Attribute.String;
    typeEs: Attribute.String;
    membersEs: Attribute.String;
    descEn: Attribute.Text;
    descEs: Attribute.Text;
    menuImgEn: Attribute.String;
    menuImgEs: Attribute.String;
    menus: Attribute.JSON;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::diningwednesday.diningwednesday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::diningwednesday.diningwednesday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiFlyerfridayFlyerfriday extends Schema.CollectionType {
  collectionName: 'flyerfridays';
  info: {
    singularName: 'flyerfriday';
    pluralName: 'flyerfridays';
    displayName: 'flyerfriday';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    flyerImg: Attribute.String;
    nameEn: Attribute.String;
    nameEs: Attribute.String;
    spotEn: Attribute.String;
    spotEs: Attribute.String;
    hourStart: Attribute.String;
    hourEnd: Attribute.String;
    descEn: Attribute.Text;
    descEs: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::flyerfriday.flyerfriday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::flyerfriday.flyerfriday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiFlyermondayFlyermonday extends Schema.CollectionType {
  collectionName: 'flyermondays';
  info: {
    singularName: 'flyermonday';
    pluralName: 'flyermondays';
    displayName: 'flyermonday';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    flyerImg: Attribute.String;
    nameEn: Attribute.String;
    nameEs: Attribute.String;
    spotEn: Attribute.String;
    spotEs: Attribute.String;
    hourStart: Attribute.String;
    hourEnd: Attribute.String;
    descEn: Attribute.Text;
    descEs: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::flyermonday.flyermonday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::flyermonday.flyermonday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiFlyersaturdayFlyersaturday extends Schema.CollectionType {
  collectionName: 'flyersaturdays';
  info: {
    singularName: 'flyersaturday';
    pluralName: 'flyersaturdays';
    displayName: 'flyersaturday';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    flyerImg: Attribute.String;
    nameEn: Attribute.String;
    nameEs: Attribute.String;
    spotEn: Attribute.String;
    spotEs: Attribute.String;
    hourStart: Attribute.String;
    hourEnd: Attribute.String;
    descEn: Attribute.Text;
    descEs: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::flyersaturday.flyersaturday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::flyersaturday.flyersaturday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiFlyersgalleryFlyersgallery extends Schema.CollectionType {
  collectionName: 'flyersgalleries';
  info: {
    singularName: 'flyersgallery';
    pluralName: 'flyersgalleries';
    displayName: 'flyersgallery';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    flyersgallery: Attribute.Media;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::flyersgallery.flyersgallery',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::flyersgallery.flyersgallery',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiFlyersundayFlyersunday extends Schema.CollectionType {
  collectionName: 'flyersundays';
  info: {
    singularName: 'flyersunday';
    pluralName: 'flyersundays';
    displayName: 'flyersunday';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    flyerImg: Attribute.String;
    nameEn: Attribute.String;
    nameEs: Attribute.String;
    spotEn: Attribute.String;
    spotEs: Attribute.String;
    hourStart: Attribute.String;
    hourEnd: Attribute.String;
    descEn: Attribute.String;
    descEs: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::flyersunday.flyersunday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::flyersunday.flyersunday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiFlyerthursdayFlyerthursday extends Schema.CollectionType {
  collectionName: 'flyerthursdays';
  info: {
    singularName: 'flyerthursday';
    pluralName: 'flyerthursdays';
    displayName: 'flyerthursday';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    flyerImg: Attribute.String;
    nameEn: Attribute.String;
    nameEs: Attribute.String;
    spotEn: Attribute.String;
    spotEs: Attribute.String;
    hourStart: Attribute.String;
    hourEnd: Attribute.String;
    descEn: Attribute.Text;
    descEs: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::flyerthursday.flyerthursday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::flyerthursday.flyerthursday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiFlyertitlefridayFlyertitlefriday
  extends Schema.CollectionType {
  collectionName: 'flyertitlefridays';
  info: {
    singularName: 'flyertitlefriday';
    pluralName: 'flyertitlefridays';
    displayName: 'flyertitlefriday';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    nameEn: Attribute.String;
    nameEs: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::flyertitlefriday.flyertitlefriday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::flyertitlefriday.flyertitlefriday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiFlyertitlemondayFlyertitlemonday
  extends Schema.CollectionType {
  collectionName: 'flyertitlemondays';
  info: {
    singularName: 'flyertitlemonday';
    pluralName: 'flyertitlemondays';
    displayName: 'flyertitlemonday';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    nameEn: Attribute.String;
    nameEs: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::flyertitlemonday.flyertitlemonday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::flyertitlemonday.flyertitlemonday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiFlyertitlesaturdayFlyertitlesaturday
  extends Schema.CollectionType {
  collectionName: 'flyertitlesaturdays';
  info: {
    singularName: 'flyertitlesaturday';
    pluralName: 'flyertitlesaturdays';
    displayName: 'flyertitlesaturday';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    nameEn: Attribute.String;
    nameEs: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::flyertitlesaturday.flyertitlesaturday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::flyertitlesaturday.flyertitlesaturday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiFlyertitlesundayFlyertitlesunday
  extends Schema.CollectionType {
  collectionName: 'flyertitlesundays';
  info: {
    singularName: 'flyertitlesunday';
    pluralName: 'flyertitlesundays';
    displayName: 'flyertitlesunday';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    nameEn: Attribute.String;
    nameEs: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::flyertitlesunday.flyertitlesunday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::flyertitlesunday.flyertitlesunday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiFlyertitlethursdayFlyertitlethursday
  extends Schema.CollectionType {
  collectionName: 'flyertitlethursdays';
  info: {
    singularName: 'flyertitlethursday';
    pluralName: 'flyertitlethursdays';
    displayName: 'flyertitlethursday';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    nameEn: Attribute.String;
    nameEs: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::flyertitlethursday.flyertitlethursday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::flyertitlethursday.flyertitlethursday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiFlyertitletuesdayFlyertitletuesday
  extends Schema.CollectionType {
  collectionName: 'flyertitletuesdays';
  info: {
    singularName: 'flyertitletuesday';
    pluralName: 'flyertitletuesdays';
    displayName: 'flyertitletuesday';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    nameEn: Attribute.String;
    nameEs: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::flyertitletuesday.flyertitletuesday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::flyertitletuesday.flyertitletuesday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiFlyertitlewednesdayFlyertitlewednesday
  extends Schema.CollectionType {
  collectionName: 'flyertitlewednesdays';
  info: {
    singularName: 'flyertitlewednesday';
    pluralName: 'flyertitlewednesdays';
    displayName: 'flyertitlewednesday';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    nameEn: Attribute.String;
    nameEs: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::flyertitlewednesday.flyertitlewednesday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::flyertitlewednesday.flyertitlewednesday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiFlyertuesdayFlyertuesday extends Schema.CollectionType {
  collectionName: 'flyertuesdays';
  info: {
    singularName: 'flyertuesday';
    pluralName: 'flyertuesdays';
    displayName: 'flyertuesday';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    flyerImg: Attribute.String;
    nameEn: Attribute.String;
    nameEs: Attribute.String;
    spotEn: Attribute.String;
    spotEs: Attribute.String;
    hourStart: Attribute.String;
    hourEnd: Attribute.String;
    descEn: Attribute.Text;
    descEs: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::flyertuesday.flyertuesday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::flyertuesday.flyertuesday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiFlyerwednesdayFlyerwednesday extends Schema.CollectionType {
  collectionName: 'flyerwednesdays';
  info: {
    singularName: 'flyerwednesday';
    pluralName: 'flyerwednesdays';
    displayName: 'flyerwednesday';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    flyerImg: Attribute.String;
    nameEn: Attribute.String;
    nameEs: Attribute.String;
    spotEn: Attribute.String;
    spotEs: Attribute.String;
    hourStart: Attribute.String;
    hourEnd: Attribute.String;
    descEn: Attribute.Text;
    descEs: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::flyerwednesday.flyerwednesday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::flyerwednesday.flyerwednesday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiRestaurantmenugalleryRestaurantmenugallery
  extends Schema.CollectionType {
  collectionName: 'restaurantmenugalleries';
  info: {
    singularName: 'restaurantmenugallery';
    pluralName: 'restaurantmenugalleries';
    displayName: 'menusgallery';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    menu: Attribute.Media;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::restaurantmenugallery.restaurantmenugallery',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::restaurantmenugallery.restaurantmenugallery',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiRestaurantsbarsgalleryRestaurantsbarsgallery
  extends Schema.CollectionType {
  collectionName: 'restaurantsbarsgalleries';
  info: {
    singularName: 'restaurantsbarsgallery';
    pluralName: 'restaurantsbarsgalleries';
    displayName: 'restaurantsbarsgallery';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    restaurantsbarsgallery: Attribute.Media;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::restaurantsbarsgallery.restaurantsbarsgallery',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::restaurantsbarsgallery.restaurantsbarsgallery',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiStafffridayStafffriday extends Schema.CollectionType {
  collectionName: 'stafffridays';
  info: {
    singularName: 'stafffriday';
    pluralName: 'stafffridays';
    displayName: 'stafffriday';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    staffImg: Attribute.String;
    positionEn: Attribute.String;
    positionEs: Attribute.String;
    bioEn: Attribute.Text;
    bioEs: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::stafffriday.stafffriday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::stafffriday.stafffriday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiStaffgalleryStaffgallery extends Schema.CollectionType {
  collectionName: 'staffgalleries';
  info: {
    singularName: 'staffgallery';
    pluralName: 'staffgalleries';
    displayName: 'staffgallery';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    staffgallery: Attribute.Media;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::staffgallery.staffgallery',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::staffgallery.staffgallery',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiStaffmondayStaffmonday extends Schema.CollectionType {
  collectionName: 'staffmondays';
  info: {
    singularName: 'staffmonday';
    pluralName: 'staffmondays';
    displayName: 'staffmonday';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    staffImg: Attribute.String;
    positionEn: Attribute.String;
    positionEs: Attribute.String;
    bioEn: Attribute.Text;
    bioEs: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::staffmonday.staffmonday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::staffmonday.staffmonday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiStaffsaturdayStaffsaturday extends Schema.CollectionType {
  collectionName: 'staffsaturdays';
  info: {
    singularName: 'staffsaturday';
    pluralName: 'staffsaturdays';
    displayName: 'staffsaturday';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    staffImg: Attribute.String;
    positionEn: Attribute.String;
    positionEs: Attribute.String;
    bioEn: Attribute.Text;
    bioEs: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::staffsaturday.staffsaturday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::staffsaturday.staffsaturday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiStaffsundayStaffsunday extends Schema.CollectionType {
  collectionName: 'staffsundays';
  info: {
    singularName: 'staffsunday';
    pluralName: 'staffsundays';
    displayName: 'staffsunday';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    staffImg: Attribute.String;
    positionEn: Attribute.String;
    positionEs: Attribute.String;
    bioEn: Attribute.Text;
    bioEs: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::staffsunday.staffsunday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::staffsunday.staffsunday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiStaffthuesdayStaffthuesday extends Schema.CollectionType {
  collectionName: 'staffthuesdays';
  info: {
    singularName: 'staffthuesday';
    pluralName: 'staffthuesdays';
    displayName: 'staffthursday';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    staffImg: Attribute.String;
    positionEn: Attribute.String;
    positionEs: Attribute.String;
    bioEn: Attribute.Text;
    bioEs: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::staffthuesday.staffthuesday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::staffthuesday.staffthuesday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiStafftuesdayStafftuesday extends Schema.CollectionType {
  collectionName: 'stafftuesdays';
  info: {
    singularName: 'stafftuesday';
    pluralName: 'stafftuesdays';
    displayName: 'stafftuesday';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    staffImg: Attribute.String;
    positionEn: Attribute.String;
    positionEs: Attribute.String;
    bioEn: Attribute.Text;
    bioEs: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::stafftuesday.stafftuesday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::stafftuesday.stafftuesday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiStaffwednesdayStaffwednesday extends Schema.CollectionType {
  collectionName: 'staffwednesdays';
  info: {
    singularName: 'staffwednesday';
    pluralName: 'staffwednesdays';
    displayName: 'staffwednesday';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    staffImg: Attribute.String;
    positionEn: Attribute.String;
    positionEs: Attribute.String;
    bioEn: Attribute.Text;
    bioEs: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::staffwednesday.staffwednesday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::staffwednesday.staffwednesday',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'plugin::i18n.locale': PluginI18NLocale;
      'api::activitiesgallery.activitiesgallery': ApiActivitiesgalleryActivitiesgallery;
      'api::activityfriday.activityfriday': ApiActivityfridayActivityfriday;
      'api::activitymonday.activitymonday': ApiActivitymondayActivitymonday;
      'api::activitysaturday.activitysaturday': ApiActivitysaturdayActivitysaturday;
      'api::activitysunday.activitysunday': ApiActivitysundayActivitysunday;
      'api::activitythursday.activitythursday': ApiActivitythursdayActivitythursday;
      'api::activitytuesday.activitytuesday': ApiActivitytuesdayActivitytuesday;
      'api::activitywednesday.activitywednesday': ApiActivitywednesdayActivitywednesday;
      'api::barfriday.barfriday': ApiBarfridayBarfriday;
      'api::barmonday.barmonday': ApiBarmondayBarmonday;
      'api::barsaturday.barsaturday': ApiBarsaturdayBarsaturday;
      'api::barsunday.barsunday': ApiBarsundayBarsunday;
      'api::barthursday.barthursday': ApiBarthursdayBarthursday;
      'api::bartuestady.bartuestady': ApiBartuestadyBartuestady;
      'api::barwednesday.barwednesday': ApiBarwednesdayBarwednesday;
      'api::breakfastfriday.breakfastfriday': ApiBreakfastfridayBreakfastfriday;
      'api::breakfastmonday.breakfastmonday': ApiBreakfastmondayBreakfastmonday;
      'api::breakfastsaturday.breakfastsaturday': ApiBreakfastsaturdayBreakfastsaturday;
      'api::breakfastsunday.breakfastsunday': ApiBreakfastsundayBreakfastsunday;
      'api::breakfastthursday.breakfastthursday': ApiBreakfastthursdayBreakfastthursday;
      'api::breakfasttuesday.breakfasttuesday': ApiBreakfasttuesdayBreakfasttuesday;
      'api::breakfastwednesday.breakfastwednesday': ApiBreakfastwednesdayBreakfastwednesday;
      'api::diningfriday.diningfriday': ApiDiningfridayDiningfriday;
      'api::diningmonday.diningmonday': ApiDiningmondayDiningmonday;
      'api::diningsaturday.diningsaturday': ApiDiningsaturdayDiningsaturday;
      'api::diningsunday.diningsunday': ApiDiningsundayDiningsunday;
      'api::diningthursday.diningthursday': ApiDiningthursdayDiningthursday;
      'api::diningtuesday.diningtuesday': ApiDiningtuesdayDiningtuesday;
      'api::diningwednesday.diningwednesday': ApiDiningwednesdayDiningwednesday;
      'api::flyerfriday.flyerfriday': ApiFlyerfridayFlyerfriday;
      'api::flyermonday.flyermonday': ApiFlyermondayFlyermonday;
      'api::flyersaturday.flyersaturday': ApiFlyersaturdayFlyersaturday;
      'api::flyersgallery.flyersgallery': ApiFlyersgalleryFlyersgallery;
      'api::flyersunday.flyersunday': ApiFlyersundayFlyersunday;
      'api::flyerthursday.flyerthursday': ApiFlyerthursdayFlyerthursday;
      'api::flyertitlefriday.flyertitlefriday': ApiFlyertitlefridayFlyertitlefriday;
      'api::flyertitlemonday.flyertitlemonday': ApiFlyertitlemondayFlyertitlemonday;
      'api::flyertitlesaturday.flyertitlesaturday': ApiFlyertitlesaturdayFlyertitlesaturday;
      'api::flyertitlesunday.flyertitlesunday': ApiFlyertitlesundayFlyertitlesunday;
      'api::flyertitlethursday.flyertitlethursday': ApiFlyertitlethursdayFlyertitlethursday;
      'api::flyertitletuesday.flyertitletuesday': ApiFlyertitletuesdayFlyertitletuesday;
      'api::flyertitlewednesday.flyertitlewednesday': ApiFlyertitlewednesdayFlyertitlewednesday;
      'api::flyertuesday.flyertuesday': ApiFlyertuesdayFlyertuesday;
      'api::flyerwednesday.flyerwednesday': ApiFlyerwednesdayFlyerwednesday;
      'api::restaurantmenugallery.restaurantmenugallery': ApiRestaurantmenugalleryRestaurantmenugallery;
      'api::restaurantsbarsgallery.restaurantsbarsgallery': ApiRestaurantsbarsgalleryRestaurantsbarsgallery;
      'api::stafffriday.stafffriday': ApiStafffridayStafffriday;
      'api::staffgallery.staffgallery': ApiStaffgalleryStaffgallery;
      'api::staffmonday.staffmonday': ApiStaffmondayStaffmonday;
      'api::staffsaturday.staffsaturday': ApiStaffsaturdayStaffsaturday;
      'api::staffsunday.staffsunday': ApiStaffsundayStaffsunday;
      'api::staffthuesday.staffthuesday': ApiStaffthuesdayStaffthuesday;
      'api::stafftuesday.stafftuesday': ApiStafftuesdayStafftuesday;
      'api::staffwednesday.staffwednesday': ApiStaffwednesdayStaffwednesday;
    }
  }
}
