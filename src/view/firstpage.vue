<template>
	<n-space justify="center">
		<n-card title=" " class="_cord">
			<template #header-extra>
				<n-tag type="info">
					留言墙功能上线！
				</n-tag>
			</template>
			<n-h1 prefix="bar">
				<n-text type="primary">
					登陆页
				</n-text>
			</n-h1>
			<template #footer>
				<img src="/POSTER.gif" alt="POSTER" class="_pic">
			</template>
			<template #action>
				<n-space justify="space-around" size="large">
					<router-link to="/auth/login">
						<n-button ghost type="primary" size="large">
							<template #icon>
								<n-icon>
									<ChevronCircleRight24Filled />
								</n-icon>
							</template>
							登录
						</n-button></router-link>
					<router-link to="/auth/register">
						<n-button ghost type="info" size="large">
							<template #icon>
								<n-icon>
									<PersonAdd24Filled />
								</n-icon>
							</template>
							注册
						</n-button></router-link>
				</n-space>
				<br>
				『期待一下~(☆▽☆)』
			</template>
		</n-card>
	</n-space>
</template>
<script setup>
import { PersonAdd24Filled, ChevronCircleRight24Filled } from "@vicons/fluent";
import { ref } from 'vue';
import { LogInOutline } from "@vicons/ionicons5";

</script>
<style>
._cord {
	margin-top: 50px;
	position: relative;
	width: 100%;
	max-width: 100%;
	height: auto;
}

._pic {
	border-radius: 10px;
	max-width: 100%;
	height: auto;
}
.n-layout-scroll-container {
  text-align: center;
}
</style>
