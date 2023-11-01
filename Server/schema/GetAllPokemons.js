import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLBoolean,
  GraphQLNonNull,
} from "graphql";

const PokemonType = new GraphQLObjectType({
  name: "Pokemon",
  fields: () => ({
    _id: { type: GraphQLInt },
    name: { type: GraphQLString },
    base_experience: { type: GraphQLInt },
    height: { type: GraphQLInt },
    is_default: { type: GraphQLBoolean },
    order: { type: GraphQLInt },
    weight: { type: GraphQLInt },
    abilities: {
      type: new GraphQLList(
        new GraphQLObjectType({
          name: "Ability",
          fields: {
            ability: {
              type: new GraphQLObjectType({
                name: "AbilityInfo",
                fields: {
                  name: { type: GraphQLString },
                  url: { type: GraphQLString },
                },
              }),
            },
            is_hidden: { type: GraphQLBoolean },
            slot: { type: GraphQLInt },
          },
        })
      ),
    },
    forms: {
      type: new GraphQLList(
        new GraphQLObjectType({
          name: "Form",
          fields: {
            name: { type: GraphQLString },
            url: { type: GraphQLString },
          },
        })
      ),
    },
    game_indices: {
      type: new GraphQLList(
        new GraphQLObjectType({
          name: "GameIndex",
          fields: {
            game_index: { type: GraphQLInt },
            version: {
              type: new GraphQLObjectType({
                name: "Version",
                fields: {
                  name: { type: GraphQLString },
                  url: { type: GraphQLString },
                },
              }),
            },
          },
        })
      ),
    },
    held_items: {
      type: new GraphQLList(
        new GraphQLObjectType({
          name: "HeldItem",
          fields: {
            item: {
              type: new GraphQLObjectType({
                name: "Item",
                fields: {
                  name: { type: GraphQLString },
                  url: { type: GraphQLString },
                },
              }),
            },
            version_details: {
              type: new GraphQLList(
                new GraphQLObjectType({
                  name: "VersionDetail",
                  fields: {
                    rarity: { type: GraphQLInt },
                    version: {
                      type: new GraphQLObjectType({
                        name: "VersionInfo",
                        fields: {
                          name: { type: GraphQLString },
                          url: { type: GraphQLString },
                        },
                      }),
                    },
                  },
                })
              ),
            },
          },
        })
      ),
    },
    location_area_encounters: { type: GraphQLString },
    moves: {
      type: new GraphQLList(
        new GraphQLObjectType({
          name: "Move",
          fields: {
            move: {
              type: new GraphQLObjectType({
                name: "MoveInfo",
                fields: {
                  name: { type: GraphQLString },
                  url: { type: GraphQLString },
                },
              }),
            },
            version_group_details: {
              type: new GraphQLList(
                new GraphQLObjectType({
                  name: "VersionGroupDetail",
                  fields: {
                    level_learned_at: { type: GraphQLInt },
                    move_learn_method: {
                      type: new GraphQLObjectType({
                        name: "MoveLearnMethod",
                        fields: {
                          name: { type: GraphQLString },
                          url: { type: GraphQLString },
                        },
                      }),
                    },
                    version_group: {
                      type: new GraphQLObjectType({
                        name: "VersionGroup",
                        fields: {
                          name: { type: GraphQLString },
                          url: { type: GraphQLString },
                        },
                      }),
                    },
                  },
                })
              ),
            },
          },
        })
      ),
    },
    species: {
      type: new GraphQLObjectType({
        name: "Species",
        fields: {
          name: { type: GraphQLString },
          url: { type: GraphQLString },
        },
      }),
    },
    sprites: {
      type: new GraphQLObjectType({
        name: "Sprites",
        fields: {
          back_default: { type: GraphQLString },
          back_female: { type: GraphQLString },
          back_shiny: { type: GraphQLString },
          back_shiny_female: { type: GraphQLString },
          front_default: { type: new GraphQLNonNull(GraphQLString) },
          front_female: { type: GraphQLString },
          front_shiny: { type: GraphQLString },
          front_shiny_female: { type: GraphQLString },
          other: {
            type: new GraphQLObjectType({
              name: "OtherSprites",
              fields: {
                dream_world: {
                  type: new GraphQLObjectType({
                    name: "DreamWorldSprites",
                    fields: {
                      front_default: { type: GraphQLString },
                      front_female: { type: GraphQLString },
                    },
                  }),
                },
                home: {
                  type: new GraphQLObjectType({
                    name: "HomeSprites",
                    fields: {
                      front_default: { type: GraphQLString },
                      front_female: { type: GraphQLString },
                      front_shiny: { type: GraphQLString },
                      front_shiny_female: { type: GraphQLString },
                    },
                  }),
                },
                official_artwork: {
                  type: new GraphQLObjectType({
                    name: "OfficialArtworkSprites",
                    fields: {
                      front_default: { type: GraphQLString },
                      front_shiny: { type: GraphQLString },
                    },
                  }),
                },
              },
            }),
          },
          versions: {
            type: new GraphQLObjectType({
              name: "SpriteVersions",
              fields: {
                generation_i: {
                  type: new GraphQLObjectType({
                    name: "GenerationI",
                    fields: {
                      red_blue: {
                        type: new GraphQLObjectType({
                          name: "RedBlueSprites",
                          fields: {
                            back_default: { type: GraphQLString },
                            back_gray: { type: GraphQLString },
                            front_default: { type: GraphQLString },
                            front_gray: { type: GraphQLString },
                          },
                        }),
                      },
                      yellow: {
                        type: new GraphQLObjectType({
                          name: "YellowSprites",
                          fields: {
                            back_default: { type: GraphQLString },
                            back_gray: { type: GraphQLString },
                            front_default: { type: GraphQLString },
                            front_gray: { type: GraphQLString },
                          },
                        }),
                      },
                    },
                  }),
                },
                generation_viii: {
                  type: new GraphQLObjectType({
                    name: "GenerationVIII",
                    fields: {
                      icons: {
                        type: new GraphQLObjectType({
                          name: "GenerationVIIIIcons",
                          fields: {
                            front_default: { type: GraphQLString },
                            front_female: { type: GraphQLString },
                          },
                        }),
                      },
                    },
                  }),
                },
              },
            }),
          },
        },
      }),
    },
    stats: {
      type: new GraphQLList(
        new GraphQLObjectType({
          name: "Stat",
          fields: {
            base_stat: { type: GraphQLInt },
            effort: { type: GraphQLInt },
            stat: {
              type: new GraphQLObjectType({
                name: "StatInfo",
                fields: {
                  name: { type: GraphQLString },
                  url: { type: GraphQLString },
                },
              }),
            },
          },
        })
      ),
    },
    types: {
      type: new GraphQLList(
        new GraphQLObjectType({
          name: "TypeSlot",
          fields: {
            slot: { type: GraphQLInt },
            type: {
              type: new GraphQLObjectType({
                name: "TypeInfo",
                fields: {
                  name: { type: GraphQLString },
                  url: { type: GraphQLString },
                },
              }),
            },
          },
        })
      ),
    },
    reviews: {
      type: new GraphQLList(
        new GraphQLObjectType({
          name: "Review",
          fields: {
            rating: { type: GraphQLInt },
            description: { type: GraphQLString },
            userID: { type: GraphQLString },
            pokemon: {
              type: PokemonType,
              resolve(parent, args) {
                return PokemonModel.findById(parent.pokemonId);
              },
            },
          },
        })
      ),
    },
  }),
});

export default PokemonType;
