import React, { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Modal
} from 'react-native'

interface OTPInputProps {
  loading: boolean
  message: string
  onClose: () => void
  onSubmit: (otp: string) => void
  onResendOTP: () => void
  resendCooldown?: number
}

function OTPInput({
  loading,
  message,
  onClose,
  onSubmit,
  onResendOTP,
  resendCooldown = 60
}: OTPInputProps) {
  const { t } = useTranslation()
  const [otp, setOtp] = useState('')
  const [timer, setTimer] = useState(resendCooldown)
  const [resendTimer, setResendTimer] = useState(0)
  const otpInputRef = useRef<TextInput>(null)

  useEffect(() => {
    if (loading) {
      setTimer(resendCooldown)
      const interval = setInterval(() => {
        setTimer((prev) => (prev > 0 ? prev - 1 : 0))
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [loading, resendCooldown])

  useEffect(() => {
    if (resendTimer > 0) {
      const interval = setInterval(() => {
        setResendTimer((prev) => (prev > 0 ? prev - 1 : 0))
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [resendTimer])

  useEffect(() => {
    if (loading && otpInputRef.current) {
      setTimeout(() => {
        otpInputRef.current?.focus()
      }, 300)
    }
  }, [loading])

  const handleInputChange = (text: string) => {
    if (/^\d*$/.test(text) && text.length <= 6) {
      setOtp(text)
    }
  }

  const handleSubmit = () => {
    if (otp.length === 6) {
      onSubmit(otp)
    } else {
      alert(t('otp.invalidOTP'))
    }
  }

  const handleResendOTP = () => {
    if (resendTimer === 0) {
      onResendOTP()
      setResendTimer(resendCooldown)
      setTimer(resendCooldown)
    }
  }

  return (
    <Modal transparent={true} animationType="fade" visible={loading}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>×</Text>
          </TouchableOpacity>

          <View style={styles.contentContainer}>
            <Text style={styles.titleText}>{t('otp.verification')}</Text>
            <Text style={styles.message}>{message}</Text>

            <View style={styles.timerContainer}>
              <Text style={styles.timerLabel}>{t('otp.timeRemain')}</Text>
              <Text style={styles.timer}>{timer}s</Text>
            </View>

            <TextInput
              ref={otpInputRef}
              style={styles.input}
              keyboardType="numeric"
              maxLength={6}
              value={otp}
              onChangeText={handleInputChange}
              placeholder="******"
              placeholderTextColor="#B0B0B0"
              selectionColor="#4A90E2"
            />

            <View style={styles.actionContainer}>
              <TouchableOpacity
                style={[
                  styles.primaryButton,
                  timer === 0 && styles.disabledButton
                ]}
                onPress={handleSubmit}
                disabled={timer === 0}
              >
                <Text
                  style={[
                    styles.primaryButtonText,
                    timer === 0 && styles.disabledText
                  ]}
                >
                  {t('otp.submit')}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.secondaryButton,
                  resendTimer > 0 && styles.disabledButton
                ]}
                onPress={handleResendOTP}
                disabled={resendTimer > 0}
              >
                <Text
                  style={[
                    styles.secondaryButtonText,
                    resendTimer > 0 && styles.disabledText
                  ]}
                >
                  {resendTimer > 0
                    ? `${t('otp.resend')} (${resendTimer}s)`
                    : t('otp.resend')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)'
  },
  container: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    overflow: 'hidden'
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 15,
    zIndex: 10
  },
  closeButtonText: {
    fontSize: 28,
    color: '#D9534F'
  },
  contentContainer: {
    paddingVertical: 20,
    paddingHorizontal: 30,
    alignItems: 'center'
  },
  titleText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 15,
    textAlign: 'center'
  },
  message: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 24
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  timerLabel: {
    fontSize: 16,
    color: '#333333',
    marginRight: 10
  },
  timer: {
    fontSize: 16,
    color: '#FF6F61',
    fontWeight: 'bold'
  },
  input: {
    width: '100%',
    height: 60,
    borderWidth: 2,
    borderColor: '#A9A9A9',
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 22,
    textAlign: 'center',
    color: '#333333',
    backgroundColor: '#F9F9F9',
    letterSpacing: 10
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 25
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#A9A9A9',
    paddingVertical: 15,
    borderRadius: 12,
    marginRight: 10,
    alignItems: 'center'
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600'
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#A9A9A9'
  },
  secondaryButtonText: {
    color: '#A9A9A9',
    fontSize: 16,
    fontWeight: '600'
  },
  disabledButton: {
    opacity: 0.5
  },
  disabledText: {
    color: '#A9A9A9'
  }
})

export default OTPInput
