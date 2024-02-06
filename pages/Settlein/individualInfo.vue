<template>
    <view class="page">
        <u--form
            labelPosition="left"
            :model="dataList"
            :rules="rules"
            ref="form"
            labelWidth="220rpx"
            :labelStyle="{ fontSize: '24rpx' }"
        >
            <view class="card">
                <u-form-item label="入驻商家名称" prop="shopName" :required="true" borderBottom>
                    <u--input
                        inputAlign="right"
                        border="none"
                        placeholder="请输入名称"
                        v-model="dataList.shopName"
                        :customStyle="{ backgroundColor: '#ffffff' }"
                    >
                    </u--input>
                </u-form-item>
                <u-form-item label="经营者姓名" prop="legalName" :required="true" borderBottom>
                    <u--input
                        inputAlign="right"
                        border="none"
                        placeholder="请输入姓名"
                        v-model="dataList.legalName"
                        :customStyle="{ backgroundColor: '#ffffff' }"
                    >
                    </u--input>
                </u-form-item>
                <u-form-item label="经营者手机号" prop="legalMobile" :required="true" borderBottom>
                    <u--input
                        inputAlign="right"
                        border="none"
                        placeholder="请输入手机号"
                        v-model="dataList.legalMobile"
                        :customStyle="{ backgroundColor: '#ffffff' }"
                    >
                    </u--input>
                </u-form-item>
                <u-form-item label="经营者邮箱" prop="legalEmail" :required="true" :borderBottom="identity == 2">
                    <u--input
                        inputAlign="right"
                        border="none"
                        placeholder="请输入经营者邮箱"
                        v-model="dataList.legalEmail"
                        :customStyle="{ backgroundColor: '#ffffff' }"
                    >
                    </u--input>
                </u-form-item>
                <u-form-item label="代理人手机号" prop="agentMobile" :required="true" v-if="identity == 2">
                    <u--input
                        inputAlign="right"
                        border="none"
                        placeholder="请输入手机号"
                        v-model="dataList.agentMobile"
                        :customStyle="{ backgroundColor: '#ffffff' }"
                    >
                    </u--input>
                </u-form-item>
            </view>
            <view class="card">
                <u-form-item label="身份证号" prop="legalIdcardNo" :required="true" borderBottom>
                    <u--input
                        inputAlign="right"
                        border="none"
                        placeholder="请输入身份证号"
                        v-model="dataList.legalIdcardNo"
                        :customStyle="{ backgroundColor: '#ffffff' }"
                    >
                    </u--input>
                </u-form-item>
                <u-form-item label="证件截止日期" prop="legalCardDeadline" :required="true" borderBottom>
                    <view @click="showtime = true">
                        <u--input
                            inputAlign="right"
                            border="none"
                            :disabled="true"
                            placeholder="请选择截至日期"
                            v-model="dataList.legalCardDeadline"
                            :customStyle="{ backgroundColor: '#ffffff' }"
                        >
                        </u--input>
                    </view>
                </u-form-item>
                <u-form-item label="家庭地址" prop="legalmanHomeAddr" :required="true">
                    <u--input
                        inputAlign="right"
                        border="none"
                        placeholder="请输入法人家庭地址"
                        v-model="dataList.legalmanHomeAddr"
                        :customStyle="{ backgroundColor: '#ffffff' }"
                    >
                    </u--input>
                </u-form-item>
            </view>
            <view class="card">
                <u-form-item label="省市区" prop="areatext" :required="true" borderBottom>
                    <view @click="OnAreaCode">
                        <u--input
                            inputAlign="right"
                            border="none"
                            :disabled="true"
                            placeholder="请选择省市区"
                            v-model="dataList.areatext"
                            :customStyle="{ backgroundColor: '#ffffff' }"
                        >
                        </u--input>
                    </view>
                </u-form-item>
                <u-form-item label="营业地址" prop="shopAddrExt" :required="true" borderBottom>
                    <u--input
                        inputAlign="right"
                        border="none"
                        placeholder="请输入公司或营业门店地址"
                        v-model="dataList.shopAddrExt"
                        :customStyle="{ backgroundColor: '#ffffff' }"
                    >
                    </u--input>
                </u-form-item>
                <u-form-item label="统一社会信用代码" prop="shopLic" :required="true">
                    <u--input
                        inputAlign="right"
                        border="none"
                        placeholder="请输入统一社会信用代码"
                        v-model="dataList.shopLic"
                        :customStyle="{ backgroundColor: '#ffffff' }"
                    >
                    </u--input>
                </u-form-item>
            </view>
            <view class="card">
                <u-form-item label="开户行所在地" :required="true" borderBottom>
                    <view @click="OnBankAreaCode">
                        <u--input
                            inputAlign="right"
                            border="none"
                            :disabled="true"
                            placeholder="请选择开户行所在地"
                            v-model="dataList.areacity"
                            :customStyle="{ backgroundColor: '#ffffff' }"
                        >
                        </u--input>
                    </view>
                </u-form-item>

                <u-form-item
                    label="开户行"
                    v-if="dataList.areacity || !isshow"
                    prop="bankName"
                    :required="true"
                    borderBottom
                >
                    <u-search
                        @search="seachBank"
                        @custom="seachBank"
                        searchIconSize="0"
                        searchIconColor="#ffffff"
                        bgColor="#ffffff"
                        placeholder="请选择开户行"
                        v-model="dataList.bankName"
                        :showAction="true"
                        actionText="搜索"
                        :animation="false"
                    ></u-search>
                </u-form-item>
                <u-form-item label="开户账号" prop="bankAcctNo" :required="true" borderBottom>
                    <u--input
                        inputAlign="right"
                        border="none"
                        placeholder="请输入银行开户账号"
                        v-model="dataList.bankAcctNo"
                        :customStyle="{ backgroundColor: '#ffffff' }"
                    >
                    </u--input>
                </u-form-item>
                <u-form-item label="开户名称" prop="bankAcctName" :required="true">
                    <u--input
                        inputAlign="right"
                        border="none"
                        placeholder="请输入银行开户名称"
                        v-model="dataList.bankAcctName"
                        :customStyle="{ backgroundColor: '#ffffff' }"
                    >
                    </u--input>
                </u-form-item>
            </view>
            <!-- 	<u-form-item label="控股股东">
				<u-radio-group v-model="dataList.shareHolderType" placement="row" activeColor="#d91b1b">
					<u-radio label="法定代表人" name="1">
					</u-radio>
					<u-radio :customStyle="{marginLeft: '5px'}" label="其他自然人" name="2">
					</u-radio>
					<u-radio :customStyle="{marginLeft: '5px'}" label="公司" name="3">
					</u-radio>
				</u-radio-group>
			</u-form-item>
			<u-form-item label="受益人">
				<u-radio-group v-model="dataList.bnfType" placement="row" activeColor="#d91b1b">
					<u-radio label="法定代表人" name="1">
					</u-radio>
					<u-radio :customStyle="{marginLeft: '5px'}" label="其他自然人" name="2">
					</u-radio>
				</u-radio-group>
			</u-form-item> -->
        </u--form>
        <view v-if="isshow" style="font-size: 24rpx; margin: 40rpx 0rpx" class="u-flex">
            <view>
                <u-checkbox-group
                    @change="OnChangecheckboxValue1"
                    v-model="checkboxValue1"
                    placement="column"
                    activeColor="#d91b1b"
                >
                    <u-checkbox :customStyle="{ marginBottom: '8px' }"> </u-checkbox>
                </u-checkbox-group>
            </view>
            <view>
                我确认以上信息并同意签署
                <text style="color: #d91b1b" @click="OnPushCooperation">《商家合作协议》</text>
                <text v-if="settleType == 1">和</text>
                <text style="color: #d91b1b" @click="handleShowUnionpay" v-if="settleType == 1"
                    >《银联商务隐私政策》</text
                >
                <unionpay-privacy :showUnionpay.sync="showUnionpay"></unionpay-privacy>
            </view>
        </view>
        <view v-if="isshow" @click="OnSubmit" class="OnSubmit"> 提交 </view>
        <u-loading-page
            loading-mode="spinner"
            :loading="showloading"
            bgColor="rgba(34,34,34,0.2)"
            color="white"
            loadingColor="white"
        ></u-loading-page>
        <!--  #ifdef MP-WEIXIN  -->
        <view style="height: 40rpx"> </view>
        <!--  #endif -->
        <u-datetime-picker
            ref="datetimePicker"
            :show="showtime"
            mode="date"
            :minDate="today"
            :maxDate="2556098656000"
            @confirm="Ontimedate"
            @cancel="showtime = false"
        >
        </u-datetime-picker>
        <u-picker
            @cancel="showBankareaCode = false"
            :show="showBankareaCode"
            ref="uPicker1"
            :columns="columnsBank"
            @change="changeBankAreaCode"
            @confirm="confirmBankareaCode"
            keyName="label"
        ></u-picker>
        <u-picker
            @cancel="showareaCode = false"
            :show="showareaCode"
            ref="uPicker"
            :columns="areacode"
            @change="changeAreaCode"
            @confirm="confirmareaCode"
            keyName="label"
        ></u-picker>

        <u-popup :safeAreaInsetBottom="false" :show="popbank" @close="popbank = false" mode="center">
            <view class="pop">
                <u-search
                    @search="seachBankList"
                    @custom="seachBankList"
                    searchIconSize="0"
                    searchIconColor="#ffffff"
                    bgColor="#ffffff"
                    placeholder="请选择开户行"
                    v-model="dataList.bankName"
                    :showAction="true"
                    actionText="搜索"
                    :animation="false"
                ></u-search>
                <scroll-view
                    style="height: 500rpx; margin-top: 40rpx"
                    :scroll-top="scrollTop"
                    scroll-y="true"
                    class="scroll-Y"
                >
                    <view v-for="(item, index) in bankList" :key="index" class="list" @click="OnChoose(item, index)">
                        <view style="width: 560rpx">{{ item.bankBranchName }}</view>
                        <view>
                            <image
                                v-if="chooseBank != index"
                                style="width: 30rpx; height: 30rpx"
                                src="@/pages/Settlein/static/image/weixuanzhong.png"
                            ></image>
                            <image
                                v-else
                                style="width: 30rpx; height: 30rpx"
                                src="@/pages/Settlein/static/image/xuanzhong.png"
                            >
                            </image>
                        </view>
                    </view>
                </scroll-view>
                <view class="pop-btn">
                    <text @click="OnTrueBank">确定</text>
                </view>
            </view>
        </u-popup>
        <u-popup :safeAreaInsetBottom="false" :show="mccshow" @close="mccshow = false" mode="center">
            <view class="pop-mcc">
                <view class="tags">
                    <view
                        :class="{ 'current-tags': index == currentmcc }"
                        class="tags-type"
                        v-for="(item, index) in mcctype"
                        :key="item"
                        @click="currentmcc = index"
                        >{{ item }}</view
                    >
                </view>
                <view style="margin-top: 40rpx 20rpx 20rpx 20rpx">
                    <view
                        class="scc-value"
                        v-for="(item, index) in mccdata[currentmcc]"
                        :key="index"
                        @click="Onchoosemcc(item)"
                    >
                        <view style="float: left">
                            {{ item.label }}
                        </view>
                        <view style="float: right; position: relative; top: 14rpx; right: 20rpx">
                            <u-icon size="12" name="arrow-right" :bold="true" color="#222222"></u-icon>
                        </view>
                    </view>
                </view>
            </view>
        </u-popup>
        <u-popup :safeAreaInsetBottom="false" :show="showagreement" @close="showagreement = false" mode="center">
            <view class="pop-agreement">
                <view class="pop-title"> 商家合作协议 </view>
                <view style="margin-top: 40rpx; margin-bottom: 40rpx">
                    <scroll-view scroll-y="true" style="height: 400rpx; text-align: left; font-size: 20rpx">
                        <text style="font-size: 24rpx">
                            大昌汽车俱乐部商家合作协议 生效日期：2022-10-10 签约须知：
                            《大昌汽车俱乐部商家合作协议》（以下简称“本协议”）是由大昌汽车俱乐部平台（包括但不限于大昌汽车俱乐部APP、微信服务号、微信订阅号、微信小程序等）的运营方即大昌汽车俱乐部有限公司（以下简称“甲方”）与以独立经营者身份入驻大昌汽车俱乐部平台的法律主体（以下简称“乙方”）达成的关于提供和使用大昌汽车俱乐部平台服务的各项条款。
                            甲方在此特别提醒乙方认真阅读本协议各条款（对于本协议中以加粗字体显示的内容，应重点阅读），并请乙方审慎考虑并选择接受或不接受本协议。如果乙方点击“我已经阅读并同意”按钮（前述按钮的具体表述可能会做适当调整，下同），即表示乙方已充分阅读、理解并自愿接受本协议，同意受本协议各项条款的约束。
                            本“签约须知”为本协议正文的组成部分。 【名词解释】 1. “大昌汽车俱乐部商家”：
                            是指具有“大昌汽车俱乐部APP、微信服务号、微信订阅号、微信小程序等商家特区或其他仅开放给商家的专享功能”操作权限的用户。
                            2.
                            “大昌汽车俱乐部商家”服务：“大昌汽车俱乐部”基于互联网，移动智能终端设备用户端向您提供的各项服务，包括但不限于商家入驻、创建店铺、店铺管理、商品管理、订单管理等具体服务。本服务包含的具体服务以“大昌汽车俱乐部商家特区或其他专享功能”提供的服务内容为准。
                            3.用户/消费者：指在“大昌汽车俱乐部”上浏览或购买商品的用户。
                            4.乙方：指成功注册“大昌汽车俱乐部平台”并实现商家实名认证，在“大昌汽车俱乐部平台”上开店并出售商品或服务的用户。
                            5.商品：指乙方在甲方平台上发布的，可通过物流形式发送给订单用户或订单用户可通过核销码消费的活动、食品、玩乐商品、车辆、服务、养护用品等。
                            1.协议内容及生效
                            1.1.协议内容。本协议包括协议正文、附件及所有甲方已经发布的或将来可能发布的各类商务政策、规则、规范、规则解读、实施细则、通知、公告等（以下合称“平台规则”）。所有附件及平台规则均为本协议不可分割的一部分，与协议正文具有同等法律效力。协议正文、附件与平台规则冲突的，以发布在后的文件为准执行。
                            1.2.协议变更及生效。甲方有权变更（包括但不限于制定、修订、废止）本协议正文、附件及/或平台规则，将至少提前7日在甲方平台公示，并载明生效日期，乙方应实时关注公示内容。如乙方不接受变更，应当在公示期间内申请终止协议，则乙方账户将进入“功能限制”状态，本协议将终止。乙方清楚知晓、同意并确认前述“功能限制”状态下的账号无法使用，业务无法提报，甲方对于该等限制、协议终止不负有任何违约责任或其他责任。如乙方未按前述约定申请终止协议，即视为乙方接受前述变更事项。
                            1.3.服务开通。乙方申请入驻大昌汽车俱乐部平台时，乙方签署或在线接受本协议后本协议立即生效，但本协议项下的部分平台服务并不立即开通。乙方提报材料经甲方审核通过后，甲方向乙方发出服务开通通知（通知方式包括但不限于站内信、手机短信等）时，本协议项下的全部平台服务正式开通。
                            2.合作方式
                            2.1.乙方获得相应平台的账户及密码后，应当根据国家法律、法规及平台发布的规则信息依法依规经营。在遵守本协议及平台规则、不存在违约情形的前提下，可以通过甲方后台进行店铺开设、商品发布、商品核销、回复评价等。若乙方存在违约行为，平台有权限制乙方后台的部分或全部功能。
                            2.2.乙方在甲方平台入驻开店成功后，应当根据法律、法规及平台规则发布商品、提供售前售后服务及其他各项服务，双方另有约定或甲方平台规则另有规定的除外；同时乙方应依法为消费者开具正规的商品发票，相关税费由乙方自行承担。
                            2.3.甲方服务范围。
                            2.3.1.甲方负责大昌汽车俱乐部平台的日常维护、技术支持，保证平台的正常运作；作为电子商务平台经营者，甲方仅为乙方与消费者达成交易提供网页空间、虚拟经营场所、交易规则等服务，甲方并非乙方与消费者之间交易行为的参与方，不对乙方及/或消费者的任何口头、书面陈述或承诺，发布的信息及交易行为的真实性、合法性、准确性、及时性、有效性等作任何明示或暗示的保证。
                            2.3.2调整商品展示位置。除双方另有约定外，甲方有权根据商品销量、商品价格、商品质量、乙方的服务水平等综合因素调整商品的展示位置。
                              3.甲方有限责任
                            3.1.纠纷处理。乙方了解并同意，甲方及/或其关联公司并非司法机构，仅能以普通或非专业人员的知识水平标准对乙方提交的证据材料进行鉴别，甲方及/或其关联公司对交易纠纷的调处、对知识产权维权投诉等事项的处理完全是基于乙方的委托，或本协议约定、平台规则以及相关法律法规的规定，甲方及/或其关联公司无法保证交易纠纷或知识产权维权投诉等事项的处理结果符合乙方的期望，也不对上述事项的处理结果及可能产生的赔付费用承担任何责任。乙方应保证其提交的材料及信息的真实性、合法性，并承担其或用户、权利人或其他第三方提供的信息、数据不实的风险和责任。如乙方因此遭受损失，乙方同意自行向受益人或致损方索赔。
                            3.2.技术手段。乙方了解并同意，鉴于现有技术水平和客观条件的限制，甲方将采取一切可能的技术手段保持乙方使用甲方平台服务所涉的技术和信息的有效性、准确性、可靠性、及时性、稳定性、完整性，但甲方对此不作任何承诺或保证。
                            3.3.外部影响。无论在何种情况下，甲方均不对由于Internet连接故障，电脑、通讯或其他系统的故障，电力故障，罢工，劳动争议，暴乱，起义，骚乱，生产力或生产资料不足，火灾，洪水，风暴，爆炸，不可抗力，战争，政府行为，国际、国内法院的命令或第三方的不作为而造成的不能服务或延迟服务承担责任。
                            4.乙方资格要求、证明文件及信息
                            4.1.资格要求。乙方应当是具备完全民事权利能力和完全民事行为能力的自然人、法人或其他组织。若自然人用户不具备前述主体资格，则乙方及乙方的监护人应承担因此而导致的一切后果，且甲方有权注销或永久冻结乙方的帐户，并向乙方及乙方的监护人索偿相应损失。
                            4.2.证明文件及信息提交。乙方应当向甲方提交符合甲方要求的（以平台“商家入驻”界面为准）证明文件及联系人、联系地址、联系电话、账户信息等信息。
                            4.3.证明文件及信息变更的通知。协议期内，上述相关证明文件或信息发生任何变更，乙方都应及时通知甲方并更新相关证明文件或信息。
                            4.4.抽查、检查。甲方有权对乙方提供的证明文件及信息进行不定时的抽查及检查，并有权要求乙方提供证明文件原件供核对或补充提供证明文件、信息，乙方应当提供。如乙方不能提供，则甲方有权立即中止/解除本协议。
                            4.5.查询核验。乙方无条件并不可撤销地授权甲方及相关合作方（包括但不限于第三方支付机构、合作银行等）查询并核验乙方信息，包括但不限于征信信息、身份信息、联系信息等，并同意甲方与相关合作方共享上述信息。
                            5.乙方承诺
                            5.1.遵守协议与规则。乙方保证严格遵守本协议及平台规则，不从事任何有损甲方利益的行为。
                            5.2活动、商品和信息。乙方保证所发布的活动、销售的商品、提供的服务或信息符合如下要求：
                            （1） 活动、商品、服务来源正当合法，除活动、商品、服务详情另外说明外，无假冒伪劣类商品；
                            （2）服务资质：具备工商行政部门和相关行业监管机构的认证许可；
                            （3）从业人员：需符合行业要求及标准；
                            （4）不侵犯任何第三方的合法权益（包括但不限于物权、债权、著作权、商标专用权、专利权等）；
                            （5）甲方不会因乙方在甲方平台开设店铺或组织活动、销售商品等而受到任何第三方投诉/起诉；
                            （6）不属于违禁活动、商品或信息，即相关法律法规或平台规则禁止的活动、商品、服务或禁止发布的信息。
                            5.3.价格。乙方在甲方平台上销售的同款商品的销售价格不得高于乙方在其他渠道的销售价格。
                            5.4. 描述。乙方自行编辑上传的店铺名称及描述、活动、商品及服务说明、介绍、图片等信息资料是真实有效并恰当反映店铺和活动、商品及服务特性的，不存在虚假、伪造或侵犯第三方权益的内容，不存在违反《中华人民共和国广告法》、《中华人民共和国价格法》等法律法规的情形，且乙方保证甲方在其平台使用上述信息资料不会侵犯第三方的权益。
                            5.5.   活动、商品质量及售后。乙方将按照不低于《中华人民共和国产品质量法》、《中华人民共和国消费者权益保护法》及其他法律法规、国家强制性标准以及平台规则的要求，组织活动、出事商品并提供“三包”等售后服务。
                            5.6.充分披露。乙方承诺未隐瞒任何其他信息以致足以影响甲方签订及履行本协议。
                            5.7.诚实信用。乙方保证在使用甲方平台进行业务的过程中遵守诚实信用原则，不在交易中采取虚假宣传、混淆等欺诈或不正当竞争行为，不扰乱网络交易的正常秩序，不从事与网上交易无关的行为。
                            5.8.乙方在甲方提供的评价系统中对与乙方达成交易的活动、商品、服务进行评价回复时应遵守甲方规则的相关规定，评价回复内容应当客观真实，不应包含任何污言秽语、色情低俗、广告信息及法律法规与本协议列明的其他禁止性信息；乙方不利用评价对其他用户实施威胁、敲诈勒索。甲方可按照甲方规则的相关规定对乙方实施上述行为所产生的评价信息进行删除或屏蔽。
                            5.9.经营模式。乙方承诺不抄袭、模仿甲方商业模式从事类似业务。乙方与甲方合作期间，甲方有权监督乙方的经营行为，并对乙方违法、违规行为做出处理，相关定义及违规判定、处理方式以相关法律法规为准。
                            5.10.虚假交易的禁止。乙方不得以任何手段利用甲方平台规则漏洞或系统漏洞，通过虚假交易套取平台积分、红包、补贴（即刷单套券），或者获取虚假商品销量、虚假好评、虚假信用评价等不当利益，或者恶意损害其他商家或任何第三方合法权益。
                            5.11.账户的保管。乙方应妥善保管、使用甲方提供的相关账户（包括但不限于用户名、原始密码信息）及/或乙方自行修改的密码，并确保使用其该等账户的主体均为乙方或乙方授权的人员；除非适用的法律法规另有明确规定或本协议另有明确的约定，乙方不得以任何形式泄露、擅自转让、披露或授权他人使用该账户。
                            5.12.违法行为的禁止。乙方签署及履行本协议过程中应当遵守有关法律法规以及其他任何对其适用的规定，不得利用甲方或甲方平台从事任何违法活动，包括但不限于侵害任何第三方的合法权益或者获取任何不正当利益，乙方应就其实施的与本协议有关的行为承担全部责任。
                            5.13.乙方数据的使用。为了更好的向乙方及用户推送更优质的服务，乙方同意并不可撤销的授权甲方及其关联单位（包含但不限于“大昌汽车”平台、“51小晶灵”
                            平台等）可自行收集、保存、使用乙方在正常生产经营活动中产生的相关数据，包括但不限于交易主体、交易数量、售后评价等交易信息，并同意可将上述获取信息进行市场分析、调研、产品信息推送、营销外呼等，且甲方无义务返还乙方。同时，甲方无义务就获取、备份、处理、使用前述信息或数据向乙方支付任何费用。
                            5.14.乙方信息的披露。乙方知悉并同意：甲方有义务根据有关法律要求向司法机关和政府部门提供乙方的信息和资料。甲方有权根据自己的判断、有关协议和规则、国家生效裁判文书或者与交易有关的消费者的合理请求披露乙方的信息资料，甲方对此不承担任何责任。
                            5.15.个人信息保护。乙方保证严格依据《中华人民共和国网络安全法》等法律法规的规定以及本协议的约定，使用和保护用户（消费者）的个人信息，包括但不限于：
                            5.15.1.确保通过合法渠道获取、使用和保存个人信息，按照用户的要求查询、更正、删除个人信息，保证不在违背用户真实意愿或用户未明确同意的情况下，发送任何性质的商品推荐、推广信息等；
                            5.15.2.保证不会将从甲方平台获取的个人信息或数据用于本协议约定以外的用途，承诺不以任何方式、向无关任何第三方泄露/出售甲方平台用户的个人信息；
                            5.15.3.保证不擅自获取、使用、传播涉及甲方平台用户的任何资料，包括但不限于交易数据、账户信息、支付信息、其他乙方展示于甲方平台的信息等。
                            5.16. 纠纷处理。对于因甲方经营行为导致的，消费者、知识产权权利人或其他第三方向行政机关发起的举报投诉、向法院提起的诉讼，或行政机关主动介入调查等情形，乙方保证配合甲方积极处理。
                            5.17.乙方不得有下列行为： 5.17.1.额外向用户收取除大昌汽车俱乐部平台明示以外的其他费用；
                            5.18.2.以收取加盟费等形式开发下线。 5.19.乙方对甲方引流的用户积极响应，促进交易生成。 5.20.
                            乙方保证其向甲方及相关合作方提供的全部文件及信息全面、真实、准确、合法、有效。乙方提供虚假、过期、失效文件或信息，或未及时通知并更新其文件或信息的，应独立承担全部法律责任。乙方违反本条约定的，甲方有权立即中止/解除本协议，上述行为如给甲方或第三方由此而造成损失的，甲方有权要求乙方赔偿损失责任。
                            5.19.乙方的销售行为应当基于真实的消费需求，不得存在对商品实施刷单、恶意销售、恶意维权等扰乱交易秩序的行为。基于维护甲方交易秩序及交易安全的需要，甲方发现上述情形时可主动执行关闭相关交易订单等操作。
                            6.乙方违反承诺的后果
                            6.1. 一般责任。乙方违背第5.1条至第5.19条保证或者承诺的，应当自行负责处理由此产生的争议、纠纷、处罚、诉讼、仲裁、投诉、索赔等，并承担全部法律责任（包括但不限于赔偿由此给消费者、甲方及/或任何他方造成的全部损失），确保甲方免于承受与此相关的任何索赔、责任追究或损失。同时，甲方有权制止乙方的违法违约行为，追究乙方的违约及/或侵权责任，并对乙方采取以下各类措施中的一项或多项：
                            1)部分或全部活动、商品屏蔽、降权、下架、禁售、删除；
                            2)部分或全部活动、商品移除资源位、禁止上资源位、移除广告； 3)店铺禁止上新、禁止上架；
                            4)关闭或限制乙方账户权限、店铺功能； 5)单方解除本协议，终止与乙方的合作；
                            6)平台规则规定的其他违规处理措施； 7)有权向乙方主张甲方所遭受损失的拾倍金额赔偿金。
                            7. 乙方违约责任
                            7.1.总体要求。乙方违反与甲方的各项约定，或者违反平台规则及有关法律法规规定的，甲方有权要求乙方承担违约责任。
                            7.2.违约认定。乙方若产生以下等行为的，认定为违约行为：
                            7.2.1.乙方理解并同意，甲方有权在本协议中约定及平台规则中规定违约认定程序和标准，根据协议条款的约定判定乙方是否构成违约并采取处理措施。乙方有义务及时对业务异常、数据异常现象及涉嫌违约行为进行充分举证和合理解释，甲方有权对乙方举证的材料和解释进行审核，并根据审核结果作出相应处理。乙方保证其提交的证据材料的真实性、合法性，并自行承担举证不能的后果。
                            7.3.违约责任。乙方的违约行为致使甲方及/或其关联公司利益遭受损失的，乙方应赔偿甲方及/或其关联公司的损失，并永久停止与乙方的一切合作。上述损失包括但不限于直接经济损失、消费者流失损失、商誉损失、以及甲方及/或其关联公司为减少损失、防止损失扩大、固定证据或者追究乙方及用户相关法律责任所支出的催收费、诉讼费、保全费、公证费、律师费、差旅费、鉴定费等一切有关费用和支出。乙方的违约行为造成甲方及/或其关联方商誉受损的，乙方还应为甲方及/或其关联方消除影响，消除影响的方式包括但不限于在公开发行的报刊、新闻媒体上刊登声明等。
                            7.4.乙方违约行为的范围。受乙方委托负责运营乙方“大昌汽车俱乐部”相关业务的代理人、受托人、受雇人等类似人员所实施的行为均视为乙方的行为，若该等行为违反本协议约定，则乙方应当承担违约责任。
                            8.费用结算
                            8.1正常经营情况下，消费者在甲方平台上购买乙方产品或/及服务后，相关费用在消费者完成相应产品或/及服务核销后，消费者支付的费用自动进入乙方账户，乙方可直接提现，如有提现费用由乙方自行承担；
                            8.2乙方应保证提供的账户信息真实、准确、有效，如信息变更应立即在大昌汽车俱乐部平台系统更新。
                            9. 商品退换单/货
                            9.1消费者通过乙方的店铺购买活动、商品或服务后，在未核销前可根据《消费者权益保护法》、《网络购买商品七日无理由退货暂行办法》等享有活动、商品及服务的退换单/货的权利，乙方应履行商品及服务退换单/货义务。
                            10.  关联关系条款
                            10.1.关联关系的情形。甲方有权将具备关联关系的店铺形成关联圈。前述关联关系是指店铺存在下列情形之一：
                            （1）乙方入驻人、管理人、紧急联系人等登记信息存在交叉（若乙方入驻人、管理人、紧急联系人等发生过变更，则包括变更前后的主体，下同）；
                            （2）乙方结算费用银行账户、与结算费用银行账户绑定的手机号码等存在信息交叉；
                            （3）存在其他类似性质的信息交叉及关联。
                            10.2.统一管理。甲方有权对关联圈内的乙方账户进行统一管理，包括但不限于统一中止/终止平台服务等。
                            10.3.关联乙方的处理。若关联圈中的任一乙方存在违反相关法律法规、本协议、平台规则的情形，甲方有权要求乙方对关联圈内各个关联关系作出正式的书面解释，也有权无需通知直接判定各乙方的关联关系；同时，甲方有权立即对违规乙方及其关联乙方统一采取以下各类措施中的一项或多项：
                            1)部分或全部活动、商品屏蔽、降权、下架、禁售、删除；
                            2)部分或全部活动、商品移除资源位、禁止上资源位、移除广告； 3)店铺禁止上新、禁止上架；
                            4)关闭或限制乙方账户权限、店铺功能； 5)单方解除本协议，终止与乙方的合作；
                            6)平台规则规定的其他违规处理措施； 7)有权向乙方主张甲方所遭受损失的拾倍金额赔偿金。
                            11.知识产权
                            11.1.乙方权利保证。乙方保证已合法取得其在甲方平台发布信息所涉知识产权或其他相关权利的使用权。
                            11.2.授权平台使用。对于乙方在甲方平台发布、使用或者向甲方平台提交的内容，包括但不限于专利、商标、名称、特有标识、装潢、技术秘密、肖像、版式设计、图片、音频、视频等，乙方特此授权甲方为本协议下目的使用其知识产权及其他相关权利，且乙方保证该等授权许可是合法有效的、免费的、非独家的、不可撤回的。
                            11.3.平台自有知识产权的保留。乙方知悉并同意，甲方或其关联方拥有、使用、许可、控制的或者甲方或其关联方对之享有其他权利的一切知识产权、工业产权和专有权利，包括全部商标、著作权、名称、标识、标志、微信公众号、域名、网站名称、网页、艺术作品、人物形象、专利，例如“大昌汽车”、“大昌汽车俱乐部”、“51小晶灵”及上述app图标等，由甲方或其关联方独家拥有并保留。
                            11.4.乙方任一级代表、代理、受托人或代表其各自的董事、高级管理人员或职工及其自身，不得在中国之境内外注册、使用与甲方及其关联方拥有、使用、许可或控制的商标、名称、标识、标志、微信公众号、域名、网站名称、网页、艺术作品、人物形象等相同或近似的商标，或侵犯甲方或其关联方享有的一切知识产权、工业产权和专有权利，或妨碍甲方或其关联方独自全部拥有或保留前述权利。
                            11.5.乙方责任。乙方同意并保证，若其注册与甲方及甲方关联方相同或近似的商标、名称、标识、标志、微信公众号、域名、网页等，用于开展与甲方及甲方关联方实质相同或近似的业务，则应当在甲方或甲方关联方提出相关要求时，无偿将相关商标、名称、标识、标志、微信公众号、域名、网页等转让给甲方或甲方关联方。如由此给甲方及/或甲方关联方造成损失的，乙方应赔偿全部损失并消除给甲方及/或甲方关联方造成的不良影响，同时甲方有权采取限制账号功能、追偿经济损失等措施，并有权立即解除本协议。
                            11.6.受托人或代表其各自的董事、高级管理人员或职工均遵守本协议的约定，受到本协议的拘束，如同该人被指定为“乙方”一样。 
                            12.保密条款
                            12.1.商业秘密范围及保密期限。本协议所称商业秘密包括但不限于本协议、任何补充协议所述内容及在合作过程中涉及的其他秘密信息。任何一方未经商业秘密提供方同意，均不得将该信息向任何第三方披露、传播、编辑或展示。协议方承诺，本协议终止后仍承担此条款下的保密义务，保密期将另行持续三年。
                            12.2.合法披露。因对方书面同意以及国家行政、司法强制行为而披露商业秘密的，披露方不承担责任；该商业秘密已为公众所知悉的，披露方不承担责任。
                            12.3.乙方使用平台资料的限制。乙方不得将从甲方平台获取的任何信息或数据用于本协议约定以外的用途；未经甲方许可，不得擅自获取、使用、传播甲方平台的任何资料。
                            13.  期限和终止
                            13.1.期限。本协议期限为自签署之日起至协议解除之日止，但保密、违约责任在协议终止后将继续有效。
                            13.2.终止：
                            13.2.1.乙方终止协议。乙方提交解除协议申请，经甲方审核同意后，乙方可解除本协议退出大昌汽车俱乐部平台。
                            13.2.2平台解除。出现下列情形之一的，甲方有权单方解除本协议：
                            （1）乙方违反平台规则或本协议中的承诺或保证，包括但不限于本协议项下的任何约定;
                            （2）乙方超过六十（60）天未以乙方后台管理账户及密码登录大昌汽车俱乐部平台;
                            （3）乙方与甲方产生纠纷，或乙方行为可能影响甲方商誉；
                            （4）乙方擅自终止履行本协议或者将本协议项下权利义务转让给任何第三方；
                            （5）甲方自主决定解除本协议，并以书面形式提前通知乙方； （6）可以解除协议的其他情形。
                            13.3.协议终止后事项的处理
                            13.3.1.账户关闭。自本协议终止之日起，甲方将关闭乙方在甲方的账户权限，并对乙方产品全部下架，乙方将无法再通过该账户进行任何形式的操作，且大昌汽车俱乐部平台不再显示任何乙方产品信息。
                            13.3.2.数据处理。本协议终止后，甲方有权保留乙方的注册信息及交易行为记录等数据，但甲方没有为乙方保留这些数据的义务，亦不承担在协议终止后向乙方或第三方提供任何数据信息的义务，也不就协议终止向乙方或任何第三方承担责任，但法律另有规定的除外。
                            14.不可抗力
                            14.1.由于不可抗力事件导致一方不能及时履行或者不能履行该方在本协议下的任何义务（付款义务除外）的，不构成违约。但是受不可抗力事件影响的一方应立即把不可抗力事件的性质和程度通知对方，并积极采取相应补救措施，以最大程度地减少和避免损失。 
                            15.甲方反商业贿赂条款
                            15.1.总体要求。乙方应当严格遵守法律法规有关禁止商业贿赂行为规定，坚决拒绝商业贿赂、行贿及其他不正当商业行为的馈赠。
                            15.2.商业贿赂的定义。本协议所指的商业贿赂是指乙方为获取与甲方的合作及合作的利益，乙方或其单位工作人员给予甲方员工的一切精神及物质上直接或间接的馈赠，如现金、回扣、娱乐、旅游等。
                            15.3.乙方的义务。乙方或乙方工作人员不得以乙方或个人名义向甲方任何员工及其亲属、关联方私下直接或间接赠送礼金、物品、有价证券、股份或采取其他变相手段提供不正当利益，否则均视为侵害甲方利益的行为。不正当利益包括但不限于现金、支票、信用礼品卡、样品、或其他商品、娱乐票券、会员卡、货币或货物形式的回扣、回佣、就业或置业、乙方付款的旅游、宴请及个人服务等。
                            15.4.投诉。若甲方员工要求乙方给予其任何形式的不正当利益，乙方应及时投诉，并提供相关证据给甲方。甲方相关人员查实后作出处理，并为乙方保密。甲方设定专用客服热线接受乙方的投诉：4008-010-111。
                            15.5.违规的责任。若乙方贿赂甲方任何员工，以图获取任何不正当商业利益或更特殊的商业待遇或不配合甲方查处其员工的受贿行为的，甲方将立即开除涉事员工，永久停止与乙方的一切合作，并依法对乙方采取相应措施，同时乙方应向甲方支付人民币伍万元整作为违约金。情节严重、造成重大经济损失的，甲方将依法移交司法机关处理。
                            16.其他
                            16.1.条款的独立性。如果根据适用的法律认定本协议中的任何条款或者任何条款中的任何部分无效、违法或者不具有可执行性，这种无效、违法或者不具有可执行性不影响本协议中的任何其它条款或者这些条款中的任何其它部分的效力。
                            16.2.法律适用。本协议的订立、履行、解释、变更及争议解决均适用中华人民共和国大陆地区法律（不包括冲突法规则）。
                            16.3.争议解决
                            16.3.1.约定管辖。对于因本协议产生的或者与本协议有关的争议，应友好协商解决，协商不成的，任何一方均有权提起诉讼，且双方一致同意由甲方所在地人民法院管辖。
                            16.3.2.平台与用户的管辖约定。乙方了解并确认：甲方已通过《大昌汽车俱乐部用户协议》与用户约定，对于因《大昌汽车俱乐部用户协议》而产生的或者与该协议有关的争议，若甲方为争议当事人之一的，各方应努力通过友好协商的方式进行解决，协商不成的，任何一方均有权提起诉讼，且各方一致同意由甲方住所地仲裁委员会管辖。乙方不得以任何方式排除《大昌汽车俱乐部用户协议》中该项管辖条款的适用；如乙方自行发布或与用户约定的网络购物合同管辖条款与《大昌汽车俱乐部用户协议》约定的管辖条款冲突的，以《大昌汽车俱乐部用户协议》约定为准。
                            16.4.通知及送达
                            16.4.1.通知。本协议签订或履行过程中，甲方向乙方寄送的书面通知，在交邮后第五个自然日即视为送达，乙方指定邮寄地址为其身份证住址或住所地。书面通知形式还包括但不限于在大昌汽车俱乐部平台公告、向乙方发送电子邮件、平台站内信、系统信息、手机短信、QQ消息和传真等电子方式，在采用电子方式进行通知的情况下，发送当日即视为送达。乙方应保证提供的联系信息（包括但不限于身份证住址、住所地、联系地址、联系人、联系电话、电子邮箱，下同）真实、准确、有效，如信息变更应立即在大昌汽车俱乐部平台系统更新；如乙方未及时更新，向原联系方式送达的仍视为有效送达。
                            16.4.2.法律文书送达。对于因本协议或因本协议所规定事项引起或与之相关的任何纠纷（包括但不限于一切与乙方在大昌汽车俱乐部平台发布信息、销售商品或提供服务相关的纠纷），乙方声明认可以下内容：
                            （1）司法机关可通过邮寄、手机短信或电子邮件等方式向乙方送达法律文书，乙方认可上述送达方式的有效性、合法性。以邮寄方式送达法律文书的，将法律文书寄送至乙方提供给大昌汽车俱乐部平台的联系地址即视为送达。以手机短信送达法律文书的，通过手机短信方式发至乙方提供给大昌汽车俱乐部平台的手机号码即视为送达。
                            （2）乙方同意司法机关可采取以上一种或多种送达方式向其送达法律文书，司法机关采取多种方式向其送达法律文书的，送达时间以上述送达方式中最先送达的为准。
                            （3）乙方确认的上述送达方式适用于各个司法阶段，包括但不限于一审、二审、再审、执行以及督促程序（含支付令送达）。
                            （4）乙方保证提供的联系方式是真实、准确、有效的，并进行实时更新。如果因提供的联系信息不准确，或不及时告知变更后的联系方式，使法律文书无法送达或未及时送达的，由乙方自行承担由此可能产生的法律后果。
                        </text>
                    </scroll-view>
                </view>

                <view class="pop-bottom" @click="Onqianshu">
                    我已阅读并同意签署
                    <view v-if="!isfinish" style="display: inline-block">
                        <u-count-down
                            @finish="Onfinish"
                            :autoStart="false"
                            ref="countDown"
                            :time="10 * 1000"
                            format="ss"
                            @change="onChange"
                        >
                            <view class="time__custom">
                                （<text class="time__custom__item">{{ timeData.seconds }}</text
                                >秒）
                            </view>
                        </u-count-down>
                    </view>
                </view>
            </view>
        </u-popup>
        <u-toast ref="uToast"></u-toast>
    </view>
</template>

<script>
import UnionpayPrivacy from "./components/UnionpayPrivacy";
export default {
    components: { UnionpayPrivacy },
    data() {
        return {
            showloading: false,
            mccdata: [
                [
                    {
                        label: "就餐场所和餐馆",
                        value: "5812",
                    },
                    {
                        label: "住宿服务（旅馆、酒店、汽车旅馆、度假村等）",
                        value: "7011",
                    },
                    {
                        label: "会员俱乐部、乡村俱乐部及私人会所",
                        value: "7997",
                    },
                ],
                [
                    {
                        label: "汽车经销商－新旧车的销售服务维修零件及出租",
                        value: "5511",
                    },
                ],
                [
                    {
                        label: "大型景区售票",
                        value: "4733",
                    },
                    {
                        label: "大型仓储式家庭用品卖场",
                        value: "5200",
                    },
                    {
                        label: "加油站、服务站",
                        value: "5541",
                    },
                ],
                [
                    {
                        label: "慈善和社会公益服务组织",
                        value: "8398",
                    },
                ],
                [
                    {
                        label: "旅游相关服务直销",
                        value: "5962",
                    },
                    {
                        label: "广告服务",
                        value: "7311",
                    },
                    {
                        label: "管理、咨询和公共关系服务",
                        value: "7392",
                    },
                    {
                        label: "电影院",
                        value: "7832",
                    },
                    {
                        label: "百货商店",
                        value: "5311",
                    },
                    {
                        label: "汽车和家庭用品店",
                        value: "5531",
                    },
                ],
                [
                    {
                        label: "保险销售、保险业和保险金",
                        value: "6300",
                    },
                ],
            ],
            currentmcc: 0,
            mcctype: ["一类", "二类", "三类", "四类", "五类", "六类"],
            allareacode: "",
            showBankareaCode: false,
            showareaCode: false,
            areaCode: "",
            areacity: "",
            showtime: false,
            rules: {
                agentMobile: [
                    {
                        required: true,
                        message: "请输入法定代表人手机号",
                        trigger: ["change", "blur"],
                    },
                    {
                        // 自定义验证函数，见上说明
                        validator: (rule, value, callback) => {
                            // 上面有说，返回true表示校验通过，返回false表示不通过
                            // uni.$u.test.mobile()就是返回true或者false的
                            return uni.$u.test.mobile(value);
                        },
                        message: "手机号码不正确",
                        // 触发器可以同时用blur和change
                        trigger: ["change", "blur"],
                    },
                ],
                bankNo: {
                    type: "string",
                    required: true,
                    message: "请搜索开户行",
                    trigger: ["blur", "change"],
                },
                legalEmail: {
                    type: "string",
                    required: true,
                    message: "请填写经营者邮箱",
                    trigger: ["blur", "change"],
                },
                legalmanHomeAddr: {
                    type: "string",
                    required: true,
                    message: "请填写法人家庭地址",
                    trigger: ["blur", "change"],
                },
                legalIdcardNo: {
                    required: true,
                    len: 18,
                    message: "请填写18位身份证号",
                    trigger: ["blur", "change"],
                },
                legalCardDeadline: {
                    type: "string",
                    required: true,
                    message: "请填写法人证件到期日期",
                    trigger: ["blur", "change"],
                },
                legalMobile: [
                    {
                        required: true,
                        message: "请输入经营者手机号",
                        trigger: ["change", "blur"],
                    },
                    {
                        // 自定义验证函数，见上说明
                        validator: (rule, value, callback) => {
                            // 上面有说，返回true表示校验通过，返回false表示不通过
                            // uni.$u.test.mobile()就是返回true或者false的
                            return uni.$u.test.mobile(value);
                        },
                        message: "手机号码不正确",
                        // 触发器可以同时用blur和change
                        trigger: ["change", "blur"],
                    },
                ],
                cardid: {
                    type: "string",
                    required: true,
                    message: "请填写身份证",
                    trigger: ["blur", "change"],
                },
                legalName: {
                    type: "string",
                    required: true,
                    message: "请填写经营者姓名",
                    trigger: ["blur", "change"],
                },
                shopName: {
                    type: "string",
                    required: true,
                    message: "请填写入驻商家名称",
                    trigger: ["blur", "change"],
                },
                bankAcctNo: {
                    required: true,
                    min: 10,
                    max: 22,
                    message: "请填写10-22位开户账号名称",
                    trigger: ["blur", "change"],
                },
                bankAcctName: {
                    type: "string",
                    required: true,
                    message: "请填写开户名称",
                    trigger: ["blur", "change"],
                },
                areatext: {
                    type: "string",
                    required: true,
                    message: "请选择省市区",
                    trigger: ["blur", "change"],
                },
                shopAddrExt: {
                    type: "string",
                    required: true,
                    message: "请输入公司或营业门店地址",
                    trigger: ["blur", "change"],
                },
                shopLic: {
                    type: "string",
                    required: true,
                    message: "请输入统一信用代码",
                    trigger: ["blur", "change"],
                },
                bankName: {
                    type: "string",
                    required: true,
                    message: "请选择开户行",
                    trigger: ["blur", "change"],
                },
            },
            mccshow: false,
            today: "",
            isshow: true,
            dataList: {
                agentMobile: "",
                companyAddrExt: "",
                companyCertExpire: "9999-12-31",
                areacity: "",
                shopTypeId: "",
                regMerType: "00",
                shopName: "",
                legalName: "",
                legalMobile: "",
                legalIdcardNo: "",
                legalCardDeadline: "",
                legalmanHomeAddr: "",
                legalEmail: "",
                bankNo: "",
                bankNo: "",
                bankName: "",
                bankAcctType: "1",
                bankAcctNo: "",
                bankAcctName: "",
                shopProvinceId: "",
                shopCityId: "",
                shopCountryId: "",
                areatext: "",
                shopAddrExt: "",
                shopLic: "",
                shareHolderType: "1",
                bnfType: "1",
                bnfList: [
                    {
                        bnfName: "",
                        bnfCertno: "",
                        bnfCertExpire: "",
                        bnfCertType: "1",
                        bnfHomeAddr: "",
                    },
                ],
                picList: [],
            },
            columnsBank: [],
            areacode: [],
            columnData: [],
            areaData: [],
            areaquData: [],
            popbank: false,
            bankList: [],
            chooseBank: null,
            isopen: false,
            isareaopen: false,
            popbankBranchName: "",
            popcode: "",
            showagreement: false,
            timeData: {},
            isfinish: false,
            agree: false,
            checkboxValue1: [],
            // 我的身份 我是，我不是
            identity: "",
            showUnionpay: false, // 银联商务隐私政策
            settleType: "",
        };
    },
    onLoad(option) {
        this.today = new Date().valueOf();
        let _this = this;
        const eventChannel = this.getOpenerEventChannel();

        eventChannel.on("getinfo", function (data) {
            uni.$u.sleep(0).then(() => {
                _this.dataList = data.data;
                _this.dataList.areacity = "请先选择开户行所在地";
            });
        });
        if (option.isshow == 1) {
            this.isshow = false;
            uni.setNavigationBarTitle({
                title: "个体工商户经营者及主行业信息查看",
            });
            this.getList();
        }
        this.identity = option.identity;
        this.settleType = option.settleType;
        this.dataList.settleType = option.settleType;
    },
    onShow() {},
    onReady() {
        this.$refs.form.setRules(this.rules);
    },
    methods: {
        handleShowUnionpay() {
            this.showUnionpay = true;
        },
        getList() {
            this.$request
                .post("/coc-active/api/v1/merchantsettledin/dataEcho", {
                    echoType: "2",
                })
                .then((res) => {
                    this.dataList.shopName = res.data.messageConfirmations.shopName;
                    this.dataList.legalName = res.data.messageConfirmations.juridicalRealName;
                    this.dataList.legalMobile = res.data.messageConfirmations.juridicalPersonMobile;
                    this.dataList.legalEmail = res.data.messageConfirmations.juridicalEmail;
                    this.dataList.legalIdcardNo = res.data.messageConfirmations.juridicalIdCard;
                    this.dataList.legalCardDeadline = res.data.messageConfirmations.juridicalCardDeadline;
                    this.dataList.legalmanHomeAddr = res.data.messageConfirmations.juridicalAddress;
                    this.dataList.areatext = res.data.messageConfirmations.areatext;
                    this.dataList.shopAddrExt = res.data.messageConfirmations.shopAddress;
                    this.dataList.shopLic = res.data.messageConfirmations.uniformSocialCreditCode;
                    this.dataList.bankName = res.data.messageConfirmations.bankOpening;
                    this.dataList.bankAcctNo = res.data.messageConfirmations.accountOpening;
                    this.dataList.bankAcctName = res.data.messageConfirmations.nameOpening;
                    this.dataList.agentMobile = res.data.messageConfirmations.agentMobile;
                });
        },
        Onqianshu() {
            if (!this.isfinish) {
                return false;
            } else {
                this.showagreement = false;
                this.agree = true;
            }
        },
        Onfinish() {
            this.isfinish = true;
        },
        onChange(e) {
            this.timeData = e;
        },
        OnPushCooperation() {
            if (!this.isfinish) {
                this.$refs.countDown.start();
            }

            this.showagreement = true;
        },
        OnChangecheckboxValue1(item) {
            if (item.length == 1) {
                uni.$u.toast("请点击《商家合作协议》签署协议");
                this.showagreement = true;
                this.$refs.countDown.start();
            }
        },

        OnTrueBank() {
            this.dataList.bankName = this.popbankBranchName;
            this.dataList.bankNo = this.popcode;
            this.popbank = false;
        },
        OnChoose(item, index) {
            this.chooseBank = index;
            this.popcode = item.code;
            this.popbankBranchName = item.bankBranchName;
        },
        seachBankList() {
            this.$request
                .post("/coc-active/api/v1/merchantsettledin/subBranchQuery", {
                    areaCode: this.areaCode,
                    key: this.dataList.bankName,
                })
                .then((res) => {
                    this.bankList = res.data.branchBankList;
                });
        },
        seachBank() {
            if (this.dataList.bankName) {
                this.popbank = true;
                this.seachBankList();
            } else {
                this.bankList = [];
                this.popbank = true;
            }
        },
        confirmareaCode(e) {
            this.dataList.shopProvinceId = e.value[0].value;
            this.dataList.shopCityId = e.value[1].value;
            this.dataList.shopCountryId = e.value[2].value;
            this.dataList.areatext = e.value[0].label + e.value[1].label + e.value[2].label;
            this.showareaCode = false;
        },
        confirmBankareaCode(e) {
            if (e.value.length == 2) {
                this.dataList.areacity = e.value[1].label;
                this.areaCode = e.value[1].value;
            } else {
                this.dataList.areacity = e.value[0].label;
                this.areaCode = e.value[0].value;
            }
            this.showBankareaCode = false;
        },
        changeAreaCode(e) {
            this.areaData = [];
            const {
                columnIndex,
                value,
                values, // values为当前变化列的数组内容
                index,
                picker = this.$refs.uPicker,
            } = e;
            // 当第一列值发生变化时，变化第二列(后一列)对应的选项
            if (columnIndex === 0) {
                this.$request
                    .post("/coc-active/api/v1/merchantsettledin/getAreaCode", {
                        level: "2",
                        adCode: value[0].value,
                    })
                    .then((res) => {
                        res.data.filter((s, i) => {
                            this.areaData.push({
                                label: s.name,
                                value: s.adCode,
                            });
                        });
                        uni.$u.sleep(0).then(() => {
                            if (columnIndex === 0) {
                                // picker为选择器this实例，变化第二列对应的选项
                                picker.setColumnValues(1, this.areaData);
                            }
                            this.areaquData = [];
                            this.$request
                                .post("/coc-active/api/v1/merchantsettledin/getAreaCode", {
                                    level: "3",
                                    adCode: this.areaData[0].value,
                                })
                                .then((res) => {
                                    res.data.filter((s, i) => {
                                        this.areaquData.push({
                                            label: s.name,
                                            value: s.adCode,
                                        });
                                    });
                                    uni.$u.sleep(0).then(() => {
                                        // picker为选择器this实例，变化第二列对应的选项
                                        picker.setColumnValues(2, this.areaquData);
                                    });
                                });
                        });
                    });
            }
            if (columnIndex === 1) {
                this.areaquData = [];
                this.$request
                    .post("/coc-active/api/v1/merchantsettledin/getAreaCode", {
                        level: "3",
                        adCode: value[1].value,
                    })
                    .then((res) => {
                        res.data.filter((s, i) => {
                            this.areaquData.push({
                                label: s.name,
                                value: s.adCode,
                            });
                        });
                        uni.$u.sleep(30).then(() => {
                            if (columnIndex === 1) {
                                // picker为选择器this实例，变化第二列对应的选项
                                picker.setColumnValues(2, this.areaquData);
                            }
                        });
                    });
            }
        },

        changeBankAreaCode(e) {
            this.columnData = [];
            const {
                columnIndex,
                value,
                values, // values为当前变化列的数组内容
                index,
                picker = this.$refs.uPicker1,
            } = e;
            // 当第一列值发生变化时，变化第二列(后一列)对应的选项
            if (columnIndex === 0) {
                this.$request
                    .post("/coc-active/api/v1/merchantsettledin/getAreaCode", {
                        level: "2",
                        adCode: value[0].value,
                    })
                    .then((res) => {
                        res.data.filter((s, i) => {
                            this.columnData.push({
                                label: s.name,
                                value: s.adCode,
                            });
                        });
                        uni.$u.sleep(30).then(() => {
                            if (columnIndex === 0) {
                                // picker为选择器this实例，变化第二列对应的选项
                                picker.setColumnValues(1, this.columnData);
                            }
                        });
                    });
            }
        },
        OnAreaCode() {
            this.$request
                .post("/coc-active/api/v1/merchantsettledin/getAreaCode", {
                    level: "1",
                })
                .then((res) => {
                    if (!this.isareaopen) {
                        res.data.filter((s, i) => {
                            if (i != 0) {
                                this.areacode.push({
                                    label: s.name,
                                    value: s.adCode,
                                });
                            }
                        });
                        this.areacode = [this.areacode];
                        this.areacode.push([
                            {
                                label: "市辖区",
                                value: "1101",
                            },
                        ]);
                        this.areacode.push([
                            {
                                label: "东城区 ",
                                value: "110101",
                            },
                            {
                                label: "西城区",
                                value: "110102",
                            },
                            {
                                label: "朝阳区",
                                value: "110105",
                            },
                            {
                                label: "丰台区",
                                value: "110106",
                            },
                            {
                                label: "石景山区",
                                value: "110107",
                            },
                            {
                                label: "海淀区",
                                value: "110108",
                            },
                            {
                                label: "门头沟区",
                                value: "110109",
                            },
                            {
                                label: "房山区 ",
                                value: "110111",
                            },
                            {
                                label: "通州区",
                                value: "110112",
                            },
                            {
                                label: "顺义区",
                                value: "110113",
                            },
                            {
                                label: "昌平区",
                                value: "110114",
                            },
                            {
                                label: "大兴区",
                                value: "110115",
                            },
                            {
                                label: "怀柔区",
                                value: "110116",
                            },
                            {
                                label: "平谷区",
                                value: "110117",
                            },
                            {
                                label: "密云区",
                                value: "110118",
                            },
                            {
                                label: "延庆区",
                                value: "110119",
                            },
                        ]);
                        this.isareaopen = true;
                    }
                    this.showareaCode = true;
                });
        },
        OnBankAreaCode() {
            this.$request
                .post("/coc-active/api/v1/merchantsettledin/getAreaCode", {
                    level: "1",
                })
                .then((res) => {
                    if (!this.isopen) {
                        res.data.filter((s, i) => {
                            if (i != 0) {
                                this.columnsBank.push({
                                    label: s.name,
                                    value: s.adCode,
                                });
                            }
                        });

                        this.columnsBank = [this.columnsBank];
                        this.columnsBank.push([
                            {
                                label: "市辖区",
                                value: "11",
                            },
                        ]);
                        this.isopen = true;
                    }
                    this.showBankareaCode = true;
                });
        },
        Ontimedate(val) {
            let time = val.value;
            var date = new Date(time);
            var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
            var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
            var hh = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
            var mm = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
            this.dataList.legalCardDeadline = date.getFullYear() + "-" + month + "-" + currentDate;
            this.showtime = false;
        },
        OnSubmit() {
            console.log(this.dataList);
            let _this = this;
            if (this.checkboxValue1.length == 0) {
                uni.$u.toast("请确认阅读并同意商家合作协议");
                return false;
            }
            if (!this.agree) {
                this.$refs.uToast.show({
                    type: "default",
                    message: "请签署商家合作协议",
                    complete() {
                        _this.showagreement = true;
                        _this.$refs.countDown.start();
                    },
                });
                return false;
            }
            if (!this.dataList.areacity) {
                uni.$u.toast("请选择开户行所在地");
                return false;
            }
            this.dataList.bankOpeningAddress = this.dataList.areacity;
            this.$refs.form
                .validate()
                .then(async (res) => {
                    // uni.navigateTo({
                    // 	url: '/pages/Settlein/uploadindividualOpening',
                    // 	success: function (res) {
                    // 		res.eventChannel.emit('getinfo', {
                    // 			data: _this.dataList
                    // 		})
                    // 	}
                    // })
                    // redis 缓存
                    const newObj = JSON.parse(JSON.stringify(this.dataList));
                    delete newObj.isLineLedger;
                    delete newObj.settleType;

                    this.$request.post("/coc-merchant-app/app/v1/merchantsettledin/preservation", {
                        mobile: uni.getStorageSync("mobile"),
                        ...newObj,
                    });
                    this.showloading = true;
                    if (this.dataList.isLineLedger == 1) {
                        try {
                            await this.$request
                                .post("/coc-active/api/v1/merchantsettledin/dataUpload", this.dataList)
                                .then((res) => {
                                    this.showloading = false;
                                    if (res.code == 200) {
                                        this.$request
                                            .post("/coc-active/api/v1/merchantsettledin/corporatePayment", {
                                                umsRegId: res.data,
                                                companyAccount: this.dataList.bankAcctNo,
                                            })
                                            .then(() => {
                                                this.$refs.uToast.show({
                                                    type: "success",
                                                    message: "上传成功，请等待审核成功后认证",
                                                    complete() {
                                                        uni.navigateTo({
                                                            url:
                                                                "/pages/Settlein/individualProgress?type=2&isLineLedger=" +
                                                                _this.dataList.isLineLedger +
                                                                "&settleType=" +
                                                                _this.settleType +
                                                                "&umsRegId=" +
                                                                res.data,
                                                        });
                                                    },
                                                });
                                            });
                                    } else {
                                        this.$refs.uToast.show({
                                            message: res.message,
                                        });
                                    }
                                })
                                .finally(() => {
                                    this.showloading = false;
                                });
                        } catch (error) {
                            console.log(JSON.stringify(error));
                            this.$refs.uToast.show({
                                message: "接口请求错误",
                            });
                            this.showloading = false;
                        }
                    } else {
                        try {
                            await this.$request
                                .post("/coc-active/api/v1/merchantsettledin/offlineDataUpload", this.dataList)
                                .then((res) => {
                                    this.showloading = false;
                                    if (res.code == 200) {
                                        this.$refs.uToast.show({
                                            type: "success",
                                            message: "上传成功，请等待审核成功后认证",
                                            complete() {
                                                uni.navigateTo({
                                                    url:
                                                        "/pages/Settlein/individualProgress?type=2&isLineLedger=" +
                                                        _this.dataList.isLineLedger +
                                                        "&settleType=" +
                                                        _this.settleType,
                                                });
                                            },
                                        });
                                    } else {
                                        this.$refs.uToast.show({
                                            message: res.message,
                                        });
                                    }
                                })
                                .finally(() => {
                                    this.showloading = false;
                                });
                        } catch (error) {
                            this.$refs.uToast.show({
                                message: error,
                            });
                            this.showloading = false;
                        }
                    }
                })
                .catch((errors) => {
                    uni.$u.toast("请补全信息");
                });
        },
    },
};
</script>

<style lang="scss" scoped>
::v-deep {
    .u-checkbox__icon-wrap--square {
        padding: 20rpx;
        .u-icon__icon {
            font-size: 18px !important;
        }
    }
}
</style>
<style lang="scss">
.page {
    margin: 20rpx;
}

.areatext {
    background: #ffffff;
    width: 512rpx;
    height: 76rpx;
    border-radius: 8rpx;
    border: 1rpx solid #dadbde;
    font-size: 32rpx;
    color: #c0c4cc;
    line-height: 76rpx;
    padding-left: 20rpx;
}

.pop-mcc {
    width: 600rpx;
    background-color: #f8f8f8;
    border-radius: 20rpx;
    padding: 40rpx;

    .tags {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }

    .tags-type {
        width: 160rpx;
        height: 50rpx;
        background-color: #ffffff;
        border-radius: 10rpx;
        font-size: 28rpx;
        line-height: 50rpx;
        text-align: center;
        margin-top: 40rpx;
    }

    .current-tags {
        background-color: #d91b1b;
        color: #ffffff;
    }

    .scc-value {
        height: 51rpx;
        background-color: #ffffff;
        border-radius: 10rpx;
        color: #999999;
        font-size: 24rpx;
        margin-top: 20rpx;
        line-height: 51rpx;
        padding-left: 20rpx;
    }
}

.pop {
    width: 710rpx;
    background-color: #f8f8f8;
    border-radius: 20rpx;
    padding: 40rpx;

    .list {
        display: flex;
        justify-content: space-between;
        margin: 40rpx 20rpx;
    }

    .pop-btn {
        text-align: center;
        margin-top: 40rpx;

        text {
            width: 166rpx;
            height: 50rpx;
            background-color: #d91b1b;
            border-radius: 10rpx;
            font-size: 32rpx;
            color: #ffffff;
            display: inline-block;
        }
    }
}

.title {
    font-size: 32rpx;
    margin: 40rpx 0rpx;
}

.card {
    margin-top: 20rpx;
    padding: 20rpx 40rpx;
    background-color: #ffffff;
    border-radius: 14rpx;
    text-align: center;
}

.OnSubmit {
    margin-bottom: 40rpx;
    text-align: center;
    color: #ffffff;
    background-color: #d91b1b;
    border-radius: 40rpx;
    padding: 16rpx;
    margin: 20rpx;
    margin-top: 40rpx;
}

.pop-agreement {
    width: 650rpx;
    margin: 40rpx 28rpx 40rpx 28rpx;

    .pop-title {
        text-align: center;
        font-size: 28rpx;
        font-weight: bold;
    }

    .pop-bottom {
        text-align: center;
        width: 350rpx;
        height: 60rpx;
        border-radius: 10rpx;
        background-color: #c71d1d;
        font-size: 24rpx;
        line-height: 60rpx;
        color: #ffffff;
        margin: 20rpx auto;
    }
}
</style>
