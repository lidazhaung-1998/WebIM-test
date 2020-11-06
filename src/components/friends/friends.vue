<template>
    <div>
        <ListBox :list="finalUserList" @refreshList="refresh"></ListBox>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";
    import ListBox from '../listBox/listBox';
    import timeFormat from "../../utils/timeFormat";

    export default {
        name: "friends",
        created() {
            this.in();
        },
        beforeMount() {

        },
        data() {
            return {}
        },
        methods: {
            ...mapActions(["getUserFriendsList", "getUserBlackList"]),
            in() {
                var storeFriendsList = this.$store.state.chat.msgList.friendsList;
                if (JSON.stringify(storeFriendsList) == '[]') {
                    let {query, path} = this.$route;
                    let dif = path.indexOf('group') == -1 ? false : true;
                    this.getUserBlackList();
                    this.getUserFriendsList({
                        user: query.user,
                        isGroup: dif,
                        count: 10,
                        type: dif ? 'groupList' : 'friendsList',
                    });
                }

            },
            refresh(fresh) {
                setTimeout(function () {
                    fresh();
                }, 2000)
            }
        },
        computed: {
            ...mapGetters({
                userList: "getuserList",
                userBlack: "getUserBlack"
            }),
            finalUserList() {
                return this.userList.filter(item => {
                    if (!this.userBlack.data.includes(item.name)) {
                        return item;
                    }
                });
            }
        },
        components: {
            ListBox,
        }
    }
</script>

<style scoped>

</style>