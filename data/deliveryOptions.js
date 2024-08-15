import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js"
export const deliveryOptions = [
    {
        id: '1',
        deliveryDays: 7,
        priceCents: 0
    },
    {
        id: '2',
        deliveryDays: 3,
        priceCents: 499
    },
    {
        id: '3',
        deliveryDays: 1,
        priceCents: 999
    }
]

export function getDeliveryOptions(deliveryOptionId){
    let deliveryOptioner;
    deliveryOptions.forEach((options)=>{
      if(options.id === deliveryOptionId){
        deliveryOptioner = options;
      }
    })
    return deliveryOptioner || deliveryOptions[0]; 
}

export function calculateDeliveryDate(deliveryOption){
    const time = dayjs();
    var deliveryDate = time.add(deliveryOption.deliveryDays,'days')
    const dayofweek = deliveryDate.format("dddd")
    if(dayofweek === "Saturday"){
        deliveryDate = time.add((deliveryOption.deliveryDays + 2),'days')
    }else if(dayofweek === "Sunday"){
        deliveryDate = time.add((deliveryOption.deliveryDays + 1),'days')
    }
    const datestring = deliveryDate.format('dddd, MMMM D');
    return datestring;
}