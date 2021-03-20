/*eslint-disable sort-keys*/
import { EPC } from './types-and-interfaces';

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

export const parseAsString = (param: unknown | undefined): string => {
    if (param === '') {
        return param;
    }
    if (!param || !isString(param)) {
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        throw new Error('Not a string: ' + param);
    }
    return param;
};


// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const parseAsEPC = (param: any): EPC => {
    /* eslint-disable @typescript-eslint/no-unsafe-member-access */
    return {
        lmk_key: parseAsString(param['lmk-key']),
        address1: parseAsString(param['address1']),
        address2: parseAsString(param['address2']),
        address3: parseAsString(param['address3']),
        postcode: parseAsString(param['postcode']),
        building_reference_number: parseAsString(param['building-reference-number']),
        current_energy_rating: parseAsString(param['current-energy-rating']),
        potential_energy_rating: parseAsString(param['potential-energy-rating']),
        current_energy_efficiency: parseAsString(param['current-energy-efficiency']),
        potential_energy_efficiency: parseAsString(param['potential-energy-efficiency']),
        property_type: parseAsString(param['property-type']),
        built_form: parseAsString(param['built-form']),
        inspection_date: parseAsString(param['inspection-date']),
        local_authority: parseAsString(param['local-authority']),
        constituency: parseAsString(param['constituency']),
        county: parseAsString(param['county']),
        lodgement_date: parseAsString(param['lodgement-date']),
        transaction_type: parseAsString(param['transaction-type']),
        environment_impact_current: parseAsString(param['environment-impact-current']),
        environment_impact_potential: parseAsString(param['environment-impact-potential']),
        energy_consumption_current: parseAsString(param['energy-consumption-current']),
        energy_consumption_potential: parseAsString(param['energy-consumption-potential']),
        co2_emissions_current: parseAsString(param['co2-emissions-current']),
        co2_emiss_curr_per_floor_area: parseAsString(param['co2-emiss-curr-per-floor-area']),
        co2_emissions_potential: parseAsString(param['co2-emissions-potential']),
        lighting_cost_current: parseAsString(param['lighting-cost-current']),
        lighting_cost_potential: parseAsString(param['lighting-cost-potential']),
        heating_cost_current: parseAsString(param['heating-cost-current']),
        heating_cost_potential: parseAsString(param['heating-cost-potential']),
        hot_water_cost_current: parseAsString(param['hot-water-cost-current']),
        hot_water_cost_potential: parseAsString(param['hot-water-cost-potential']),
        total_floor_area: parseAsString(param['total-floor-area']),
        energy_tariff: parseAsString(param['energy-tariff']),
        mains_gas_flag: parseAsString(param['mains-gas-flag']),
        floor_level: parseAsString(param['floor-level']),
        flat_top_storey: parseAsString(param['flat-top-storey']),
        flat_storey_count: parseAsString(param['flat-storey-count']),
        main_heating_controls: parseAsString(param['main-heating-controls']),
        multi_glaze_proportion: parseAsString(param['multi-glaze-proportion']),
        glazed_type: parseAsString(param['glazed-type']),
        glazed_area: parseAsString(param['glazed-area']),
        extension_count: parseAsString(param['extension-count']),
        number_habitable_rooms: parseAsString(param['number-habitable-rooms']),
        number_heated_rooms: parseAsString(param['number-heated-rooms']),
        low_energy_lighting: parseAsString(param['low-energy-lighting']),
        number_open_fireplaces: parseAsString(param['number-open-fireplaces']),
        hotwater_description: parseAsString(param['hotwater-description']),
        hot_water_energy_eff: parseAsString(param['hot-water-energy-eff']),
        hot_water_env_eff: parseAsString(param['hot-water-env-eff']),
        floor_description: parseAsString(param['floor-description']),
        floor_energy_eff: parseAsString(param['floor-energy-eff']),
        floor_env_eff: parseAsString(param['floor-env-eff']),
        windows_description: parseAsString(param['windows-description']),
        windows_energy_eff: parseAsString(param['windows-energy-eff']),
        windows_env_eff: parseAsString(param['windows-env-eff']),
        walls_description: parseAsString(param['walls-description']),
        walls_energy_eff: parseAsString(param['walls-energy-eff']),
        walls_env_eff: parseAsString(param['walls-env-eff']),
        secondheat_description: parseAsString(param['secondheat-description']),
        sheating_energy_eff: parseAsString(param['sheating-energy-eff']),
        sheating_env_eff: parseAsString(param['sheating-env-eff']),
        roof_description: parseAsString(param['roof-description']),
        roof_energy_eff: parseAsString(param['roof-energy-eff']),
        roof_env_eff: parseAsString(param['roof-env-eff']),
        mainheat_description: parseAsString(param['mainheat-description']),
        mainheat_energy_eff: parseAsString(param['mainheat-energy-eff']),
        mainheat_env_eff: parseAsString(param['mainheat-env-eff']),
        mainheatcont_description: parseAsString(param['mainheatcont-description']),
        mainheatc_energy_eff: parseAsString(param['mainheatc-energy-eff']),
        mainheatc_env_eff: parseAsString(param['mainheatc-env-eff']),
        lighting_description: parseAsString(param['lighting-description']),
        lighting_energy_eff: parseAsString(param['lighting-energy-eff']),
        lighting_env_eff: parseAsString(param['lighting-env-eff']),
        main_fuel: parseAsString(param['main-fuel']),
        wind_turbine_count: parseAsString(param['wind-turbine-count']),
        heat_loss_corridoor: parseAsString(param['heat-loss-corridoor']),
        unheated_corridor_length: parseAsString(param['unheated-corridor-length']),
        floor_height: parseAsString(param['floor-height']),
        photo_supply: parseAsString(param['photo-supply']),
        solar_water_heating_flag: parseAsString(param['solar-water-heating-flag']),
        mechanical_ventilation: parseAsString(param['mechanical-ventilation']),
        address: parseAsString(param['address']),
        local_authority_label: parseAsString(param['local-authority-label']),
        constituency_label: parseAsString(param['constituency-label']),
        posttown: parseAsString(param['posttown']),
        construction_age_band: parseAsString(param['construction-age-band']),
        lodgement_datetime: parseAsString(param['lodgement-datetime']),
        tenure: parseAsString(param['tenure']),
        fixed_lighting_outlets_count: parseAsString(param['fixed-lighting-outlets-count']),
        low_energy_fixed_light_count: parseAsString(param['low-energy-fixed-light-count']),
    };

};
