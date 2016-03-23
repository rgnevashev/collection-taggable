Package.describe({
  git: 'https://github.com/rgnevashev/collection-taggable.git',
  name: 'rgnevashev:collection-taggable',
  summary: 'Behaviour taggable',
  version: '1.0.0'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');

  api.use([
    'check',
    'coffeescript',
    'underscore',
    'jeeeyul:underscore-keypath'
  ]);

  api.use([
    'matb33:collection-hooks@0.7.6',
    'zimme:collection-behaviours@1.0.3'
  ]);

  api.use([
    'aldeed:autoform@4.0.0 || 5.0.0',
    'aldeed:collection2@2.0.0',
    'aldeed:simple-schema@1.0.3'
  ], ['client', 'server'], {weak: true});

  api.imply('zimme:collection-behaviours');

  api.addFiles('taggable.coffee');
});
