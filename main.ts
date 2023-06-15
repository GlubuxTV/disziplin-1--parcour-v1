function TURN_RIGHT (TURN_ANGLE: number) {
    basic.showNumber(TURN_ANGLE)
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, TURN_ANGLE)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, TURN_ANGLE)
    basic.pause(300)
    maqueen.motorStop(maqueen.Motors.All)
}
function TURN_LEFT (TURN_ANGLE: number) {
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, TURN_ANGLE)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, TURN_ANGLE)
    basic.pause(300)
    maqueen.motorStop(maqueen.Motors.All)
}
function BACK_TO_LINE (TURN_ANGLE: number) {
    basic.showLeds(`
        . . . . .
        . # . # .
        . # . . .
        . . # . .
        . . . . .
        `)
}
function DRIVE () {
    maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 100)
    basic.pause(800)
    maqueen.motorStop(maqueen.Motors.All)
}
let TURN_ANGLE = 0
let safety = 0
let strip: neopixel.Strip = null
if ((0 as any) == (1 as any)) {
    strip = neopixel.create(DigitalPin.P15, 24, NeoPixelMode.RGB)
    music.playTone(262, music.beat(BeatFraction.Whole))
    safety = 42
    maqueen.motorStop(maqueen.Motors.All)
    strip.showColor(neopixel.colors(NeoPixelColors.Indigo))
    basic.pause(100)
    TURN_ANGLE = 175
    if (maqueen.Ultrasonic(PingUnit.Centimeters) <= 10) {
        strip.showColor(neopixel.colors(NeoPixelColors.Yellow))
        TURN_RIGHT(TURN_ANGLE)
        if (maqueen.Ultrasonic(PingUnit.Centimeters) >= 20) {
            DRIVE()
            TURN_LEFT(TURN_ANGLE)
            DRIVE()
            TURN_LEFT(TURN_ANGLE)
            if (maqueen.Ultrasonic(PingUnit.Centimeters) >= 10) {
                TURN_RIGHT(TURN_ANGLE)
                DRIVE()
                TURN_LEFT(TURN_ANGLE)
                if (maqueen.Ultrasonic(PingUnit.Centimeters) >= 10) {
                    TURN_RIGHT(TURN_ANGLE)
                    DRIVE()
                    TURN_LEFT(TURN_ANGLE)
                } else {
                    BACK_TO_LINE(TURN_ANGLE)
                }
            } else {
                BACK_TO_LINE(TURN_ANGLE)
            }
        } else {
            TURN_LEFT(TURN_ANGLE)
        }
    }
}
basic.forever(function () {
    if (maqueen.Ultrasonic(PingUnit.Centimeters) <= 10) {
        strip.showColor(neopixel.colors(NeoPixelColors.Yellow))
        TURN_RIGHT(TURN_ANGLE)
        if (maqueen.Ultrasonic(PingUnit.Centimeters) >= 20) {
            DRIVE()
            TURN_LEFT(TURN_ANGLE)
            DRIVE()
            TURN_LEFT(TURN_ANGLE)
            if (maqueen.Ultrasonic(PingUnit.Centimeters) >= 10) {
                TURN_RIGHT(TURN_ANGLE)
                DRIVE()
                TURN_LEFT(TURN_ANGLE)
                if (maqueen.Ultrasonic(PingUnit.Centimeters) >= 10) {
                    TURN_RIGHT(TURN_ANGLE)
                    DRIVE()
                    TURN_LEFT(TURN_ANGLE)
                } else {
                    BACK_TO_LINE(TURN_ANGLE)
                }
            } else {
                BACK_TO_LINE(TURN_ANGLE)
            }
        } else {
            TURN_LEFT(TURN_ANGLE)
        }
    } else {
        if (!(maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0)) {
            if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 1) {
                maqueen.motorStop(maqueen.Motors.M2)
            } else if (maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 1) {
                maqueen.motorStop(maqueen.Motors.M1)
            }
        } else {
            maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 100)
        }
    }
})
basic.forever(function () {
    if ((1 as any) == (0 as any)) {
        // Umfahrungsmanöver, wenn etwas im Weg ist
        if (maqueen.Ultrasonic(PingUnit.Centimeters) < 5) {
            // 42, weil Antwort auf alles [zahl an sich, unbedeutend]
            if (safety == 42) {
                safety += 1
                maqueen.motorStop(maqueen.Motors.All)
                maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 50)
                maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 50)
                basic.pause(500)
                maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 100)
                basic.pause(2000)
                for (let index = 0; index < 2; index++) {
                    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, 50)
                    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 50)
                    basic.pause(500)
                    maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 100)
                    basic.pause(2000)
                }
                maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 50)
                maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 50)
                basic.pause(500)
                maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 100)
                basic.pause(2000)
                safety = 42
            }
        } else {
            if (!(maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0)) {
                if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 1) {
                    maqueen.motorStop(maqueen.Motors.M2)
                } else if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 1) {
                    maqueen.motorStop(maqueen.Motors.M1)
                }
            } else {
                maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 100)
            }
        }
    }
})
