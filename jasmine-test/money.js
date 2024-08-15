import formatCurrency from "../script/util/money.js";

describe('Test Suite: FormatCurrency function', ()=>{
    it('-Convert cents into dollars-', ()=>{
        expect(formatCurrency(2095)).toEqual('20.95')
    })

    it('-Function work with 0 dollar-', ()=>{
        expect(formatCurrency(0)).toEqual('0.00')
    })
    
    it('-Function work correctly when round up number-', ()=>{
        expect(formatCurrency(2000.5)).toEqual('20.01')
    })

    it('-Function work correctly when round down number-', ()=>{
        expect(formatCurrency(2000.4)).toEqual('20.00')
    })

    it('-Test Jasmine work correctly-',()=>{
        expect(formatCurrency(0)).toEqual('1')
    })
})