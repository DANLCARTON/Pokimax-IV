<template>
    <footer>
        <p id="title">Pokimax IV</p>
        <div id="links">
            <a href="./about">À propos</a>
            <a href="./">Relancer/Recommencer</a>
        </div>
    </footer>
</template>

<style scoped>
footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    background: #353535;
    display: flex;
    justify-content: space-between;
    padding: 10px;
}
#title {
    font-weight: bolder;
}
#links a {
    padding: 0 0 0 20px
}
</style>
