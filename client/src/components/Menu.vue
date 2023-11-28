<template>
    <n-space justify="center">
        <n-menu v-model:value="activeKey" mode="horizontal" :options="menuOptions" />
    </n-space>
</template>
  
<script lang="ts">
import { defineComponent, h, ref, type Component, computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { NIcon, NMenu, NSpace } from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import {
    BookOutline as BookIcon,
    PersonOutline as PersonIcon,
    LogOutOutline as LogoutIcon,
    LogInOutline as LoginIcon,
    HomeOutline as HomeIcon
} from '@vicons/ionicons5'
import { useAuthStore } from '@/stores/auth'

function renderIcon(icon: Component) {
    return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions: MenuOption[] = [
    {
        label: () =>
            h(
                RouterLink,
                {
                    to: {
                        name: 'home',
                    }
                },
                { default: () => 'Início' }
            ),
        key: 'home-page',
        icon: renderIcon(HomeIcon)
    },
    {
        label: () =>
            h(
                RouterLink,
                {
                    to: {
                        name: 'bookstores',
                    }
                },
                { default: () => 'Bibliotecas' }
            ),
        key: 'libraries',
        icon: renderIcon(BookIcon)
    },
    {
        label: () =>
            h(
                RouterLink,
                {
                    to: {
                        name: 'bookstores',
                    }
                },
                { default: () => 'Sebos' }
            ),
        key: 'bookstore',
        icon: renderIcon(BookIcon)
    },
    {
        label: () =>
            h(
                RouterLink,
                {
                    to: {
                        name: 'bookstores',
                    }
                },
                { default: () => 'Livrarias' }
            ),
        key: 'bookshop',
        icon: renderIcon(BookIcon)
    },
]

export default defineComponent({
    setup() {
        const authStore = useAuthStore()

        const router = useRouter()

        const isAuthenticated = computed(() => {
            return authStore.isAuthenticated
        })

        menuOptions.push({
            label: 'Usuário',
            key: 'Userprofile',
            icon: renderIcon(PersonIcon),
            children: [
                {
                    type: 'group',
                    label: 'Perfil',
                    key: 'profile',
                    children: [
                        {
                            label: () =>
                                h(
                                    RouterLink,
                                    {
                                        to: {
                                            name: 'user',
                                        }
                                    },
                                    { default: () => 'Ver perfil' }
                                ),
                            key: 'viewprofile',
                            icon: renderIcon(PersonIcon)
                        },
                        {
                            label: () =>
                                h(
                                    RouterLink,
                                    {
                                        to: {
                                            name: 'logout',
                                        }
                                    },
                                    { default: () => 'Sair' }
                                ),
                            key: 'logout',
                            icon: renderIcon(LogoutIcon)
                        }
                    ]
                },
            ],
            show: isAuthenticated.value
        },
            {
                label: () =>
                    h(
                        RouterLink,
                        {
                            to: {
                                name: 'login',
                            }
                        },
                        { default: () => 'Login' }
                    ),
                key: 'userlogin',
                icon: renderIcon(LoginIcon),
                show: !isAuthenticated.value
            })

        return {
            activeKey: ref<string | null>(null),
            menuOptions,
            authStore,
            isAuthenticated
        }
    },
    components: {
        NMenu, NIcon, NSpace
    }
})
</script>