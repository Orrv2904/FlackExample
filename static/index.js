document.addEventListener("DOMContentLoaded", () => {
    const socket = io();

    let room;

    const join_button = document.querySelector("#join");

    join_button.onclick = () => {
        socket.emit("join_room", "WEB50", (res) => {
            room = res;
            
            document.querySelector("#root").innerText = `Te has unido a la sala ${room}`;
            document.querySelector("#root").innerHTML += "<br/>"
        })
    }
})

socket.on("message", (message) => {
    document.querySelector("#root").append(message);
    document.querySelector("#root").innerHTML += "<br/>"
});

const send_message = document.querySelector("#send-message");

send_message.onclick = () =>{
    const message = document.querySelector("#input-message").value;

    socket.emit("message", {
        message,
        room
    });

    message.value = "";
}

