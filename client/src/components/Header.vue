<template>
    <n-space>
        <div id="bl-header">
            <div class="bl-header-static">
                <div class="bl-header-text">
                    <h1 class="bl-header-title">Busca livro</h1>
                    <div class="bl-header-title-info">
                        Navegue pelo mapa e encontre as livrarias, bibliotecas e sebos mais próximos a você! <br>
                        Veja também feedbacks deixado por usuários que frequentaram esses lugares e entenda qual é o melhor.
                    </div>
                </div>
            </div>
        </div>
    </n-space>
</template>

<script lang="ts">
import { NSpace } from 'naive-ui'

export default {
    
}
</script>

<style scoped>
#bl-header {
    background: url('resized.jpg') no-repeat;
    background-position: 50% 60%;
    height: 500px;
}
.bl-header-static {
    max-width: 900px;
    margin: 0 auto;
    height: 500px;
}
.bl-header-text {
    position: relative;
    left: -230px;
    top: 50px;
    max-width: 700px;
    height: 300px;
    border-radius: 5%;
    background-color: rgba(139, 139, 139, 0.4);
}

.bl-header-title {
    margin: 0px;
    font-size: 60px;
    position: absolute;
    top: 20px;
    left: 60px;
    color: white;
}
.bl-header-title-info { 
    position: absolute;
    color: white;
    top: 130px;
    left: 40px;
    right: 30px;
    font-size: 20px;
    text-align: justify;
}
</style>