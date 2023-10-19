<template>
	<view class="page">
		<view class="card">
			<view class="size28 fwb" style="margin-bottom: 50rpx;">
				如果您对教练以下事项认可请打勾
			</view>
			<u-checkbox-group placement="column" @change="checkboxChange" iconPlacement="right" labelColor='#222222'>
				<u-checkbox activeColor="#D91B1B" :customStyle="{marginBottom: '28px'}" v-for="(item, index) in taglist"
					:key="index" :label="item.name" :name="item.name">
				</u-checkbox>
			</u-checkbox-group>
		</view>
		<view class="card" style="padding: 0rpx;">
				<u--textarea border="none" v-model="content" placeholder="请输入您的评价内容"></u--textarea>
				<view style="margin: 24rpx;">
					<u-upload :fileList="imgs.fileList" @afterRead="afterRead" @delete="deletePic"
						:multiple="true" :maxCount="3" style="width: 160rpx; height: 160rpx"></u-upload>
				</view>
		</view>
		<view class="card u-flex jsb">
			<view class="size28">匿名评分</view>
			<view><u-switch size='20' activeColor="#34C759" v-model="isswitch" @change="changeanonymous"></u-switch></view>
		</view>
		
		<view class="add-item" @click="Onadd">
			发布
		</view>
		<u-toast ref="showtoast"></u-toast>
	</view>
</template>

<script>
	import {
		getstorage
	} from '@/utils/index.js'
	export default {
		components: {

		},
		data() {
			return {
				is_anonymous:0,
				isswitch:false,
				imgs:{	content: '',
					fileList: [],
					},
				content:'',
				id:'',
				tag_text: [],
				tag_id: '',
				taglist: [{
						name: '1、学驾满32小时',
						value: 16
					},
					{
						name: '2、耐心仔细',
						value: 17
					},
					{
						name: '3、教学专心',
						value: 18
					},
					{
						name: '4、尽心尽责',
						value: 19
					},
					{
						name: '5、接送服务好',
						value: 20
					}
				]
			}
		},

		onLoad(option) {
			this.id=option.id
		},
		onShow() {},
		methods: {
			Onadd(){
				if(this.tag_text.length==0){
				uni.showToast({
					icon: 'none',
					title: '请选择评价事项',
				});
					return false
				}
				if(!this.content){
					uni.showToast({
						icon: 'none',
						title: '请输入评价内容',
					});
						return false
				}
				this.tag_id=''
				this.tag_text.filter(s=>{
					if(s=='1、学驾满32小时'){
						if(!this.tag_id){
							this.tag_id='16'
						}else{
							this.tag_id=this.tag_id+',16'
						}
					}else if (s=='2、耐心仔细'){
						if(!this.tag_id){
							this.tag_id='17'
						}else{
							this.tag_id=this.tag_id+',17'
						}
					}else if (s=='3、教学专心'){
						if(!this.tag_id){
							this.tag_id='18'
						}else{
							this.tag_id=this.tag_id+',18'
						}
					}else if (s=='4、尽心尽责'){
						if(!this.tag_id){
							this.tag_id='19'
						}else{
							this.tag_id=this.tag_id+',19'
						}
					}else if (s=='5、接送服务好'){
						if(!this.tag_id){
							this.tag_id='20'
						}else{
							this.tag_id=this.tag_id+',20'
						}
					}
				})
			let imgs = '',
				uploadsuccess = true
			this.imgs.fileList.forEach((m,i) => {
				if(i==0){
					imgs=m.url+''
				}else{
					imgs=imgs+','+m.url
				}
				if (m.status === 'uploading') {
					uploadsuccess = false
				}
			})
			if (!uploadsuccess) {
				uni.showToast({
					title: '图片正在上传中',
					icon: 'none',
					duration: 2000
				})
				return
			}
	this.$tokenxjlrequest.post("/user/home/evaluate",{
		token:getstorage('xjltoken'),
		type:'1',
		rel_id:this.id,
		tag_id:this.tag_id,
		content:this.content,
		imgs:imgs,
		is_anonymous:this.is_anonymous
	}).then(res=>{
		let _this=this
		if(res.code==200){
			this.$refs.showtoast.show({
				message: '评价成功',
				type: "default",
				duration: 2000,
				complete() {
						uni.$emit('add')
					uni.navigateBack({
						delta: 1
					});
				
				}
			})
		}else{
				uni.$u.toast(res.msg)
		}
	})
			
			},
			changeanonymous(e){
				if(this.isswitch){
					this.is_anonymous=1
				}else{
					this.is_anonymous=0
				}
			},
			//上传图片
			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					uni.uploadFile({
						url: getApp().globalData.uploadUrl,
						filePath: url,
						name: 'file',
						formData: {
							'file': url
						},
						header: {
							"Content-Type": 'multipart/form-data'
						},
						success: (uploadFileRes) => {
							resolve(JSON.parse(uploadFileRes.data).data)
						}
					});
				})
			},
			// 删除图片
			deletePic(event) {
				this.imgs.fileList.splice(event.index, 1)
			},
			// 新增图片
			async afterRead(event) {
				let lists = [].concat(event.file)
				lists.map((item, i) => {
					this.imgs.fileList.push({
						...item,
						status: 'uploading',
						message: '上传中',
						uploadstatus: false
					})
				})
				for (let i = 0; i < this.imgs.fileList.length; i++) {
					let data = this.imgs.fileList[i]
					if (data.status === 'uploading' && !this.imgs.fileList[i].uploadstatus) {
						this.imgs.fileList[i].uploadstatus = true
						const result = await this.uploadFilePromise(data.url)
						this.imgs.fileList[i].url = result
						this.imgs.fileList[i].status = 'success'
						this.imgs.fileList[i].message = ''
					}
				}
			},
			checkboxChange(item) {
				this.tag_text = item
			}
		}
	}
</script>

<style lang="scss">
	.page {}

	.card {
		margin: 24rpx;
		padding: 24rpx;
		background: #FFFFFF;
		border-radius: 16rpx;
	}
	.add-item{
		width: 440rpx;
		height: 84rpx;
		background: #D91B1B;
		border-radius: 174rpx ;
		text-align: center;
		line-height: 84rpx;
		color: #ffffff;
		font-size: 28rpx;
		margin: 124rpx auto;
	}
</style>
