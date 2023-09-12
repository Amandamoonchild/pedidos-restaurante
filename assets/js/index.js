class Pedido {
    constructor(cliente, mesa, descricao) {
        this.id = this.gerarId();
        this.cliente = cliente;
        this.mesa = mesa;
        this.descricao = descricao;
    }
    gerarId() {
        return Math.floor(Math.random() * 1000);
    }
}

class ListaPedidos {
    constructor() {
        this.pedidos = [];
    }
    addPedido(pedido) {
        this.pedidos.push(pedido);
    }
    listarPedidos() {
        return this.pedidos;
    }
    listarPedidosPorId(parametro) {
        return this.pedidos.find((pedido) => pedido.id == parametro);
    }

    atualizarPedido(id, cliente, mesa, descricao) {
        const pedido = this.listarPedidosPorId(id);

        pedido.cliente = cliente;
        pedido.mesa = mesa;
        pedido.descricao = descricao;

        return pedido;
    }
    deletarPedido(parametro) {
        return (this.pedidos = this.pedidos.filter(
            (pedido) => pedido.id != parametro
        ));
    }
    cont(){
        const number = this.pedidos.length;
        
        return number;
    }
}

const listapedidos = new ListaPedidos();

function criarPedido() {
    const cliente = document.getElementById("cliente").value;
    const mesa = document.getElementById("mesa").value;
    const descricao = document.getElementById("descricao").value;

    const novoPedido = new Pedido(cliente, mesa, descricao);

    listapedidos.addPedido(novoPedido);

    listarPedidos();

    contador();
}

function listarPedidos() {
    const pedidos = listapedidos.listarPedidos();

    const pedidosLista = document.getElementById("container-lista");
    pedidosLista.innerHTML = "";

    let content = "";

    pedidos.forEach((pedido) => {
        content += `
    <div class="card" id="card-${pedido.id}">
        <p> ID: ${pedido.id}</p>
        <p> Cliente: ${pedido.cliente}</p>
        <p> Mesa: ${pedido.mesa}</p>
        <p> Descrição: ${pedido.descricao}</p>
        <button onclick="atualizarPedido(${pedido.id})"> Editar</button>
        <button onclick="deletarPedido(${pedido.id})"> Deletar</button>
    </div>
    `;
    });

    pedidosLista.innerHTML = content;
}

function listarPedidosPorId(id){
    const pedido = listapedidos.listarPedidosPorId(id);
}

let aux = null;

function atualizarPedido(id){
    const pedido = listapedidos.listarPedidosPorId(id);

    document.getElementById("cliente").value = pedido.cliente;
    document.getElementById("mesa").value = pedido.mesa;
    document.getElementById("descricao").value = pedido.descricao;

    document.getElementById("cadastrar").classList.add("hidden");
    document.getElementById("editar").classList.remove("hidden");

    aux = id;
}

function editarPedido(){
    document.getElementById("cadastrar").classList.add("hidden");
    document.getElementById("editar").classList.remove("hidden");

    const cliente = document.getElementById("cliente").value;
    const mesa = document.getElementById("mesa").value;
    const descricao = document.getElementById("descricao").value;

    listapedidos.atualizarPedido(aux, cliente, mesa, descricao);

    listarPedidos();

    document.getElementById("cadastrar").classList.remove("hidden");
    document.getElementById("editar").classList.add("hidden");

    aux = null;
}

function deletarPedido(id){
    listapedidos.deletarPedido(id);

    listarPedidos();

    document.getElementById(`card-${id}`).classList.add("hidden");
}

function contador(){
    const contador = listapedidos.cont();

    console.log(contador);

    document.getElementById("result").innerHTML = `Contador:` + contador;
}