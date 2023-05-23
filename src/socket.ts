import { io } from 'socket.io-client'

const socket = io(import.meta.env.VITE_SERVER_HOST)

const socketFetch = (endpoint: string) => {
	return new Promise((resolve, reject) => {
		fetch(`${import.meta.env.VITE_SERVER_HOST}/${endpoint}`).then(async (value) => {
			const data = await value.json()
			resolve(data)
		}).catch(err => {
			reject(err)
		})
	})
}

export {socket, socketFetch}