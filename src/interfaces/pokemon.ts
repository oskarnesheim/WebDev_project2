export interface IPokemon_species{
    color: {
        name: string;
        url: string;
    };
    egg_groups: {
        name: string;
        url: string;
    }[];
    evolution_chain: {
        url: string;
    };
    evolves_from_species: {
        name: string;
        url: string;
    } | null;
    base_happiness: number;
    capture_rate: number;
    flavor_text_entries: {
        flavor_text: string;
        language: {
            name: string;
            url: string;
        };
        version: {
            name: string;
            url: string;
        };
    }[];
    form_descriptions: {
        description: string;
        language: {
            name: string;
            url: string;
        };
    }[];
    forms_switchable: boolean;
    gender_rate: number;
    genera: {
        genus: string;
        language: {
            name: string;
            url: string;
        };
    }[];
    generation: {
        name: string;
        url: string;
    };
    growth_rate: {
        name: string;
        url: string;
    };
    habitat: {
        name: string;
        url: string;
    };
    has_gender_differences: boolean;
    hatch_counter: number;
    id: number;
    is_baby: boolean;
    is_legendary: boolean;
    is_mythical: boolean;
    name: string;
    names: {
        language: {
            name: string;
            url: string;
        };
        name: string;
    }[];
    order: number;
    pal_park_encounters: {
        area: {
            name: string;
            url: string;
        };
        base_score: number;
        rate: number;
    }[];
    pokedex_numbers: {
        entry_number: number;
        pokedex: {
            name: string;
            url: string;
        };
    }[];
    shape: {
        name: string;
        url: string;
    };
    varieties: {
        is_default: boolean;
        pokemon: {
            name: string;
            url: string;
        };
    }[];
}

export interface IPokemon{
    id: number;
    name: string;
    base_experience: number;
    height: number;
    is_default: boolean;
    order: number;
    weight: number;
    abilities: {
        ability: {
            name: string;
            url: string;
        };
        is_hidden: boolean;
        slot: number;
    }[];
    forms: {
        name: string;
        url: string;
    }[];
    game_indices: {
        game_index: number;
        version: {
            name: string;
            url: string;
        };
    }[];
    held_items: {
        item: {
            name: string;
            url: string;
        };
        version_details: {
            rarity: number;
            version: {
                name: string;
                url: string;
            };
        }[];
    }[];
    location_area_encounters: string;
    moves: {
        move: {
            name: string;
            url: string;
        };
        version_group_details: {
            level_learned_at: number;
            move_learn_method: {
                name: string;
                url: string;
            };
            version_group: {
                name: string;
                url: string;
            };
        }[];
    }[];
    species: {
        back_default: string;
        back_female: string;
        back_shiny: string;
        back_shiny_female: string;
        front_default: string;
        front_female: string;
        front_shiny: string;
        front_shiny_female: string;
        other: {
            dream_world: {
                front_default: string | null;
                front_female: string | null;
            };
            home: {
                front_default: string;
                front_female: string;
                front_shiny: string;
                front_shiny_female: string;
            };
            'official-artwork': {
                front_default: string;
                front_shiny: string;
            };
        };
    }
    stats:{
        base_stat: number;
        effort: number;
        stat: {
            name: string;
            url: string;
        };
    }[];
    types: {
        slot: number;
        type: {
            name: string;
            url: string;
        };
    }[];
    past_types: {
        generation: {
            name: string;
            url: string;
        };
        types: {
            slot: number;
            type: {
                name: string;
                url: string;
            };
        }[];
    }[];
}