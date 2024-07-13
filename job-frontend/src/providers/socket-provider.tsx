'use client'

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { io as socketio } from 'socket.io-client'

const SOCKET_URL = 'ws://localhost:5000'

type Socket = ReturnType<typeof socketio>

type SocketContext = {
  socket: Socket | null
  connect: () => void
  disconnect: () => void
  emit: (ev: string, data: unknown) => void
}

const SocketContext = createContext({} as SocketContext)

export const useSocket = () => useContext(SocketContext)

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const socket = useMemo(
    () =>
      socketio(SOCKET_URL, {
        autoConnect: false,
        // transports: ['websocket'],
        reconnectionAttempts: 10,
        reconnectionDelay: 1500,
      }),
    [],
  )
  const [socketInstance, setSocketInstance] = useState<Socket | null>(null)

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected')
      setSocketInstance(socket)
    })

    socket.on('disconnect', () => {
      console.log('disconnected')
      setSocketInstance(null)
    })

    socket.on('connect_error', (err) => {
      console.log('Failed to connect')
    })

    // clean up
    return () => {
      socket.off('connect')
      socket.off('disconnect')
      socket.off('connect_error')
    }
  }, [socket])

  const connect = useCallback(() => {
    socket.connect()
  }, [socket])

  const disconnect = useCallback(() => {
    socket.disconnect()
  }, [socket])

  const emit = useCallback(
    (ev: string, data: any) => {
      console.log('data', data)
      socket.emit(ev, data || "")
    },
    [socket],
  )

  return (
    <SocketContext.Provider
      value={{ socket: socketInstance, connect, disconnect, emit }}
    >
      {children}
    </SocketContext.Provider>
  )
}

export default SocketProvider
