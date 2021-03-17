// User is used for mongoose schema
export interface IUser {
    username: string
    password: string
}

export interface NonConfidentialUser {
    username: string
    passwordHash: string
}

export interface Token {
    value: string
}

interface EncodedPolyLine {
    points: string
}

export interface SearchFilterGetDirectionsProps {
    list: string
    postcode: string
    radius: string
    results: string
}

interface LatLng {
    lat: string
    lng: string
}

interface Address {
    LatLng: LatLng
    postcode: string
    firstLine: string
}

export interface Route {
    EncodedPolyLine: EncodedPolyLine
    addresses: Address[]
}

export interface AddressData {
    address: string
    postcode: string
    lat: string
    lng: string
}

export interface Property {
    id: string
    address: string
    postcode: string
    type: string
    bedrooms: number
    price: number
    sqf: number
    lat: string
    lng: string
    distance_to: string
    highest_offer: null | string,
    url: string

}

export interface PropertyData {
    status: string
    list: {
        id: string,
        name: string
    },
    postcode: string
    radius: number
    result_count: number
    api_calls_cost: number
    properties: Property[]
}

export interface EPC {
    lmk_key: string
    address1: string
    address2: string
    address3: string
    postcode: string
    building_reference_number: string
    current_energy_rating: string
    potential_energy_rating: string
    current_energy_efficiency: string
    potential_energy_efficiency: string
    property_type: string
    built_form: string
    inspection_date: string
    local_authority: string
    constituency: string
    county: string
    lodgement_date: string
    transaction_type: string
    environment_impact_current: string
    environment_impact_potential: string
    energy_consumption_current: string
    energy_consumption_potential: string
    co2_emissions_current: string
    co2_emiss_curr_per_floor_area: string
    co2_emissions_potential: string
    lighting_cost_current: string
    lighting_cost_potential: string
    heating_cost_current: string
    heating_cost_potential: string
    hot_water_cost_current: string
    hot_water_cost_potential: string
    total_floor_area: string
    energy_tariff: string
    mains_gas_flag: string
    floor_level: string
    flat_top_storey: string
    flat_storey_count: string
    main_heating_controls: string
    multi_glaze_proportion: string
    glazed_type: string
    glazed_area: string
    extension_count: string
    number_habitable_rooms: string
    number_heated_rooms: string
    low_energy_lighting: string
    number_open_fireplaces: string
    hotwater_description: string
    hot_water_energy_eff: string
    hot_water_env_eff: string
    floor_description: string
    floor_energy_eff: string
    floor_env_eff: string
    windows_description: string
    windows_energy_eff: string
    windows_env_eff: string
    walls_description: string
    walls_energy_eff: string
    walls_env_eff: string
    secondheat_description: string
    sheating_energy_eff: string
    sheating_env_eff: string
    roof_description: string
    roof_energy_eff: string
    roof_env_eff: string
    mainheat_description: string
    mainheat_energy_eff: string
    mainheat_env_eff: string
    mainheatcont_description: string
    mainheatc_energy_eff: string
    mainheatc_env_eff: string
    lighting_description: string
    lighting_energy_eff: string
    lighting_env_eff: string
    main_fuel: string
    wind_turbine_count: string
    heat_loss_corridoor: string
    unheated_corridor_length: string
    floor_height: string
    photo_supply: string
    solar_water_heating_flag: string
    mechanical_ventilation: string
    address: string
    local_authority_label: string
    constituency_label: string
    posttown: string
    construction_age_band: string
    lodgement_datetime: string
    tenure: string
    fixed_lighting_outlets_count: string
    low_energy_fixed_light_count: string
}

export interface EPCData {
    column_names: string[]
    rows: EPC[]
}