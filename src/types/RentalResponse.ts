interface RentalResponse {
    id: number,
    dateInit: string,
    dateEnd: string,
    state: string,//pend,conf,canc
    total: number,
    username: string,
    tuitionBoat: number
}

export default RentalResponse
