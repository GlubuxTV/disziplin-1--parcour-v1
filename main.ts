let strip = neopixel.create(DigitalPin.P15, 24, NeoPixelMode.RGB)
music.playTone(262, music.beat(BeatFraction.Whole))
let safety = 42
maqueen.motorStop(maqueen.Motors.All)
strip.showColor(neopixel.colors(NeoPixelColors.Indigo))
basic.forever(function () {
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
})
