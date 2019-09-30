<template>
	<div class="change-type">
		<div class="type-right">
			<router-link :to="'/'+rootPath+'/index/'+type"><el-tag size="medium" :class="status==1?'active':''">{{typeCnName}}展示</el-tag></router-link>
			<router-link :to="'/'+rootPath+'/compare/'+type"><el-tag size="medium" :class="status==2?'active':''">{{typeCnName}}对比</el-tag></router-link>
		</div>
	</div>					
</template>

<script>
export default {
    name: 'changeType',
    props: {
        type: {
            type: String,
            required: true
        },
        typeCnName: {
            type: String,
            required: true
        },
        rootPath: {
            type: String,
            required: true
        },
        status: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            
        }
	},
	methods: {

	}
}
</script>
<style lang="sass" scoped>

</style>