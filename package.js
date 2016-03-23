Package.describe({
  git: 'https://github.com/rgnevashev/collection-taggable.git',
  name: 'rgnevashev:collection-taggable',
  summary: 'Behaviour taggable',
  version: '1.0.1'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');

  api.use([
    'check',
    'coffeescript',
    'underscore',
    'jeeeyul:underscore-keypath@0.9.3'
  ]);

  api.use([
    'matb33:collection-hooks@0.8.0',
    'zimme:collection-behaviours@1.0.0'
  ]);

  api.use([
    'aldeed:autoform@4.0.0 || 5.0.0',
    'rgnevashev:autoform-select2@4.0.0'
  ], ['client', 'server'], {weak: true});

  api.use('aldeed:simple-schema@1.5.3');
  api.imply('aldeed:simple-schema');

  api.imply('zimme:collection-behaviours');

  api.addFiles('taggable.coffee');
});
