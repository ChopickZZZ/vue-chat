import { defineStore } from 'pinia'

export const useChatStore = defineStore({
	id: 'chat',
	state: () => ({
		roomId: null,
		username: null,
		users: [],
		messages: []
	}),
	getters: {
		getUsers: state => state.users,
		getMessages: state => state.messages
	},
	actions: {
		setUsers(users) {
			this.users = users
		},
		setRoomIdAndUsername({ roomId, username }) {
			this.roomId = roomId
			this.username = username
		},
		addMessage(messageInfo) {
			const obj = { ...messageInfo }
			this.messages.push(obj)
		},
	},
})