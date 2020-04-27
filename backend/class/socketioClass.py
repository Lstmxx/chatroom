class baseSocketio(nameSpace):
    def on_connect(self):
        print('connect success')
    
    def on_disconnect(self):
        print("关闭连接")
    
    def on_message(self, data):
        print('received message: ' + data['data'])
        self.emit("response", {'age': 18})
