
defaults =
  fieldName: 'tags'
  allTagsfieldName: 'settings.tags'
  optional: true
  placeholder: 'Choose Tags'
  tokenSeparators: [',']

CollectionBehaviours.define 'taggable', (options = {}) ->
  check options, Match.OneOf(Object, Array)

  unless _.isArray options
    options = [options]

  _.each options, (opts) =>

    {fieldName, allTagsfieldName, optional, placeholder, tokenSeparators} =
      _.defaults opts, @options, defaults

    definition = definitionRelated = {}

    definition[fieldName] =
      type: [String]
      optional: optional
      label: placeholder
      autoform:
        type: 'select2'
        multiple: true
        select2Options:
          placeholder: placeholder
          tags: true
          tokenSeparators: tokenSeparators
        options: ->
          _.map _(Meteor.user()).valueForKeyPath(allTagsfieldName) or [], (tag) ->
            label: tag, value: tag

    @collection.attachSchema new SimpleSchema definition

    definitionRelated[allTagsfieldName] =
      type: [String]
      optional: true

    Meteor.users.attachSchema new SimpleSchema definitionRelated

    isLocalCollection = @collection._connection is null

    if Meteor.isServer or isLocalCollection

      @collection.after.insert (userId, doc) ->
        if doc[fieldName]?.length
          Meteor.users.direct.update userId,
            $addToSet:
              "#{allTagsfieldName}":
                $each: doc[fieldName]

      @collection.after.update (userId, doc, fields, modifier, options) ->
        if _.contains(fields, fieldName) and doc[fieldName]?.length
          Meteor.users.direct.update userId,
            $addToSet:
              "#{allTagsfieldName}":
                $each: doc[fieldName]
