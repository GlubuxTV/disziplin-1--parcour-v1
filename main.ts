function TURN_RIGHT () {
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 120)
    basic.pause(500)
    maqueen.motorStop(maqueen.Motors.All)
}
function TURN_LEFT () {
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 120)
    basic.pause(500)
    maqueen.motorStop(maqueen.Motors.All)
}
function DRIVE (time: number) {
    maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 100)
    basic.pause(time)
    maqueen.motorStop(maqueen.Motors.All)
}
let status_box = 0
let time_drive = 0
let status = 0
basic.forever(function () {
    if (status == 0) {
        if (maqueen.Ultrasonic(PingUnit.Centimeters) <= 7) {
            status = 1
            maqueen.motorStop(maqueen.Motors.All)
        }
        if (!(maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0)) {
            if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 1) {
                maqueen.motorStop(maqueen.Motors.M2)
            } else if (maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 1) {
                maqueen.motorStop(maqueen.Motors.M1)
            }
        } else {
            maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 100)
            if (maqueen.Ultrasonic(PingUnit.Centimeters) <= 7) {
                status = 1
                maqueen.motorStop(maqueen.Motors.All)
            }
        }
    } else if (status == 1) {
        TURN_LEFT()
        basic.pause(500)
        time_drive = 500
        DRIVE(time_drive)
        basic.pause(500)
        TURN_RIGHT()
        basic.pause(500)
        status_box = 1
        while (status_box == 1) {
            time_drive = 200
            DRIVE(time_drive)
            basic.pause(500)
            TURN_RIGHT()
            basic.pause(500)
            if (!(maqueen.Ultrasonic(PingUnit.Centimeters) <= 20)) {
                status_box = 0
                maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 100)
                if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 1 || maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 1) {
                    maqueen.motorStop(maqueen.Motors.All)
                }
            } else {
                TURN_LEFT()
                basic.pause(500)
            }
        }
        status = 0
    }
})
