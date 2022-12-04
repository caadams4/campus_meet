

export interface Event {
    dateTimeStart: number,
    dateTimeEnd: number,
    title: String,
    creator: String,
    descritption:String,
    attendees: String[],
    coordinates: google.maps.LatLngLiteral,
    tags: String[],
    groups: String[],
    id:String
}