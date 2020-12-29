<template>
    <div>
        <ListBox :list="groupList" @refreshList="refresh"></ListBox>
    </div>
</template>

<script>
    import ListBox from '../listBox/listBox';
    import {mapGetters, mapActions} from "vuex";

    export default {
        name: "group",
        created() {
            this.in();

        },
        data() {
            return {}
        },
        methods: {
            ...mapActions(["getUserBlackList", "getUserFriendsList"]),
            in() {
                var storeGroupList = this.$store.state.chat.msgList.groupList;
                if (JSON.stringify(storeGroupList) == '[]') {
                    let {query, path} = this.$route;
                    let dif = path.indexOf('group') == -1 ? false : true;
                    this.getUserFriendsList({
                        user: query.user,
                        isGroup: dif,
                        count: 10,
                        type: dif ? 'groupList' : 'friendsList',
                    });
                }
            },
            refresh(fresh) {
                setTimeout(() => {
                    fresh();
                }, 2500)
            }
        },
        computed: {
            ...mapGetters({
                groups: "getUserGroupList"
            }),
            groupList() {
                return this.groups;
            }
        },
        components: {
            ListBox
        }
    }
</script>

<style scoped>

</style>