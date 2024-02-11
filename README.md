# RFXCOM2MQTT Frontend

[![RFXCOM](rfxcom.png)](http://www.rfxcom.com)

RFXCOM to MQTT bridge for RFXtrx433 devices

All received RFXCOM events are published to the MQTT rfxcom2mqtt/devices/\<id\> topic.
It is up to the MQTT receiver to filter these messages or to have a register/learning/pairing mechanism.


## [Documentation](https://rfxcom2mqtt.github.io/documentation/)