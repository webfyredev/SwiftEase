import {motion} from 'framer-motion'

export const scrollUp = {
    initial : {opacity : 0, y : 20},
    whileInView : {opacity : 1, y:0},
    transition : {duration : 1},
    exit : {opacity : 0, y : 20}
}
export const scrollLeft = {
    initial : { opacity : 0, x : 20},
    whileInView : {opacity : 1, x : 0},
    transition : {duration : 1},
    exit : {opacity : 0, x : 20}
}
export const scrollRight = {
    initial : { opacity : 0, x : -20},
    whileInView : {opacity : 1, x : 0},
    transition : {duration : 1},
    exit : {opacity : 0, x : -20}
}
export const scrollUpDelay = {
    initial : {opacity : 0, y : 20},
    whileInView : {opacity : 1, y:0},
    transition : {delay : 0.3, duration : 1,},
    exit : {opacity : 0, y : 20}

}
export const scrollUpDelayNext = {
    initial : {opacity : 0, y : 20},
    whileInView : {opacity : 1, y:0},
    transition : {delay : 0.6, duration : 1,},
    exit : {opacity : 0, y : 20}

}
export const buttonHover = {
    whileHover : {scale : 1.05},
    whileTap : {scale : 0.95}
}
export const cardHover = {
    whileHover : {scale : 1.05},
    transition : {duration : 0.4}
}