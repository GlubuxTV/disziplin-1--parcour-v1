function TURN_RIGHT () {
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 120)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, 120)
    basic.pause(300)
    maqueen.motorStop(maqueen.Motors.All)
}
function TURN_LEFT () {
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, 120)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 120)
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
function DRIVE (time: number) {
    maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 100)
    basic.pause(time)
    maqueen.motorStop(maqueen.Motors.All)
}
let search_box = 0
let time = 0
let safety = 0
let status = 0
basic.forever(function () {
    if ((2 as any) == (0 as any)) {
        if (maqueen.Ultrasonic(PingUnit.Centimeters) <= 10) {
            let strip: neopixel.Strip = null
            strip.showColor(neopixel.colors(NeoPixelColors.Yellow))
            TURN_RIGHT()
            if (maqueen.Ultrasonic(PingUnit.Centimeters) >= 20) {
                let TURN_ANGLE = 0
                DRIVE(1)
                TURN_LEFT()
                DRIVE(1)
                TURN_LEFT()
                if (maqueen.Ultrasonic(PingUnit.Centimeters) >= 10) {
                    TURN_RIGHT()
                    DRIVE(1)
                    TURN_LEFT()
                    if (maqueen.Ultrasonic(PingUnit.Centimeters) >= 10) {
                        TURN_RIGHT()
                        DRIVE(1)
                        TURN_LEFT()
                    } else {
                        BACK_TO_LINE(TURN_ANGLE)
                    }
                } else {
                    BACK_TO_LINE(TURN_ANGLE)
                }
            } else {
                TURN_LEFT()
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
basic.forever(function () {
    if (status == 0) {
        if (maqueen.Ultrasonic(PingUnit.Centimeters) <= 7) {
            status = 1
            maqueen.motorStop(maqueen.Motors.All)
        }
    } else if (status == 1) {
        TURN_RIGHT()
        time = 700
        DRIVE(time)
        TURN_LEFT()
        search_box = 1
        time = 400
        while (search_box == 1) {
            DRIVE(time)
            TURN_LEFT()
            if (!(maqueen.Ultrasonic(PingUnit.Centimeters) <= 15)) {
                search_box = 0
            } else {
                TURN_RIGHT()
            }
        }
        while (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 1) {
            maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 100)
        }
        maqueen.motorStop(maqueen.Motors.All)
    }
})
