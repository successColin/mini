import carousel from "@/components/carousel/index.vue";
import tabs from "@/pages/wiseman/darenxiaodian/components/tabs.vue";
import square from "@/pages/wiseman/darenxiaodian/components/square.vue";

export const unifyMixin = {
    components: {
        carousel,
        tabs,
        square,
    },
    data() {
        return {
            init: {
                relatedName: "",
                sort: 1,
                current: 1,
                size: 50,
            },
            tabs: {
                list: [],
            },
            rows: {
                list: [],
                total: 0,
            },
        };
    },
    created() {
        console.log("created - unifyMixin");
    },
    methods: {
        async getTabsList() {
            const { data } = await this.$request.post("/coc-active/api/v1/expert/selection/library/shopCategoryList", {
                showType: 3,
            });
            const list = JSON.parse(JSON.stringify(this.tabs.list));
            data.forEach((v) => {
                list.push({ id: list.length + 1, sid: v.shopCategoryId, name: v.shopCategoryName, status: false });
            });
            this.tabs.list = list;
        },
        async getList() {
            console.log(this.init);
			this.init.isCommissionPrice=1
            const { data } = await this.$request.post("/coc-active/api/v1/expert/selection/library/list", this.init);
            const list = JSON.parse(JSON.stringify(this.rows.list));
            const typeslist = [
                { id: 1, title: "活" },
                { id: 2, title: "保" },
                { id: 3, title: "救" },
                { id: 4, title: "团" },
                { id: 5, title: "套" },
            ];
            data.records.forEach((v) => {
                typeslist.forEach((value) => {
                    if (v.type === value.id) {
                        v.type_txt = value.title;
                    }
                });
                list.push(v);
            });
            this.rows.list = list;
            this.rows.total = data.total;
        },
        setTabsList(value) {
            this.tabs.list.forEach((v) => {
                if (JSON.stringify(value) === JSON.stringify(v)) {
                    v.status = true;
                } else {
                    v.status = false;
                }
            });
            if (value.sid) {
                this.setShopCategoryId(value.sid);
            } else {
                this.setLockType(value.id === 0 ? "" : value.id);
            }
        },
        setLockType(id) {
            delete this.init.shopCategoryId;
            this.setInit("lockType", id);
        },
        setShopCategoryId(id) {
            this.setInit("shopCategoryId", id);
        },
        setSort(id) {
            this.setInit("sort", id);
        },
        setSelect(value) {
            this.rows.list.forEach((v) => {
                if (JSON.stringify(v) === JSON.stringify(value)) {
                    v.isSelection = v.isSelection === 0 ? 1 : 0;
                }
            });
        },
        setInit(key, value) {
            if (key) {
                this.init[key] = value;
            }
            this.init.current = 1;
            this.rows = {
                list: [],
                total: 0,
            };
            this.getList();
        },

        onScrollToLower() {
            if (this.rows.total > this.init.current * this.init.size) {
                this.init.current += 1;
                this.getList();
            }
        },
    },
};
