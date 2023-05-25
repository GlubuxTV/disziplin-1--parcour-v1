def macheEtwas(num: number):
    pass
strip = neopixel.create(DigitalPin.P15, 24, NeoPixelMode.RGB)
music.play_tone(262, music.beat(BeatFraction.WHOLE))
safety = 42
maqueen.motor_stop(maqueen.Motors.ALL)
strip.show_color(neopixel.colors(NeoPixelColors.INDIGO))

def on_forever():
    global safety
    # Umfahrungsmanöver, wenn etwas im Weg ist
    if maqueen.ultrasonic(PingUnit.CENTIMETERS) < 5:
        # 42, weil Antwort auf alles [zahl an sich, unbedeutend]
        if safety == 42:
            safety += 1
            maqueen.motor_stop(maqueen.Motors.ALL)
            maqueen.motor_run(maqueen.Motors.M1, maqueen.Dir.CW, 50)
            maqueen.motor_run(maqueen.Motors.M2, maqueen.Dir.CCW, 50)
            basic.pause(500)
            maqueen.motor_run(maqueen.Motors.ALL, maqueen.Dir.CW, 100)
            basic.pause(2000)
            for index in range(2):
                maqueen.motor_run(maqueen.Motors.M1, maqueen.Dir.CCW, 50)
                maqueen.motor_run(maqueen.Motors.M2, maqueen.Dir.CW, 50)
                basic.pause(500)
                maqueen.motor_run(maqueen.Motors.ALL, maqueen.Dir.CW, 100)
                basic.pause(2000)
            maqueen.motor_run(maqueen.Motors.M1, maqueen.Dir.CW, 50)
            maqueen.motor_run(maqueen.Motors.M2, maqueen.Dir.CCW, 50)
            basic.pause(500)
            maqueen.motor_run(maqueen.Motors.ALL, maqueen.Dir.CW, 100)
            basic.pause(2000)
            safety = 42
    else:
        if not (maqueen.read_patrol(maqueen.Patrol.PATROL_LEFT) == 0 and maqueen.read_patrol(maqueen.Patrol.PATROL_RIGHT) == 0):
            if maqueen.read_patrol(maqueen.Patrol.PATROL_LEFT) == 1:
                maqueen.motor_stop(maqueen.Motors.M2)
            elif maqueen.read_patrol(maqueen.Patrol.PATROL_LEFT) == 1:
                maqueen.motor_stop(maqueen.Motors.M1)
        else:
            maqueen.motor_run(maqueen.Motors.ALL, maqueen.Dir.CW, 100)
basic.forever(on_forever)
