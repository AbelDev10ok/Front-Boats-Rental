interface RentalResponse {
    id: number,
    dateInit: Date | null,
    dateEnd: Date | null,
    state: string,//pend,conf,canc
    total: number,
    username: string,
    tuitionBoat: number
}

export default RentalResponse
