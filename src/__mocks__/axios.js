const mockResponse = {
    data: {
        results: [
            {
                name: {
                    first: "Laith",
                    last: "Harb"
                },
                picture: {
                    large: "https://randomuser.me/api/portraits/men/39.jpg"
                },
                login: {
                    username: 'ThePhonyGOAT'
                }
            }
        ]
    }    
}

export default {
    get: jest.fn().mockResolvedValue(mockResponse)
}