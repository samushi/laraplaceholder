<template>
    <div class="download-zip">
	    	<div class="grid grid-cols-2">
	    		<div class="col">
	    			<div class="completed">
	    				<h2 class="heading">Uploading</h2>
	    				<span>Completed <i class="fas fa-check"></i></span>
	    			</div>
	    		</div>
	    		<div class="col">
	    			<div class="download-url">
	    				<a :href="downloadUrl" class="btn-download">Download</a>
	    				<p>It will be deleted from server in 8 hours form now. So please download and save it in your drive before it expire.</p>
	    			</div>
	    		</div>
	    	</div>
	    	<div class="grid grid-cols-2">
	    		<div class="col">
	    			<div class="reupload" ref="reupload" :class="highlighted ? 'highlighted' : 'unhighlight'">
	    				<h2>More Images to Convert ?</h2>
				    	<p>(only .JPEG, .JPG, .PNG & .GIF accepted)</p>
				    	<p>OR</p>

				    	<div class="file_upload">
					        <button class="btn-upload">Browse</button> 
					        <input class="input-files" @change="onFileSelected" value="Browse" type="file" name="files[]" multiple="">
					    </div>

					    <p>to Upload</p>
	    			</div>
	    		</div>
	    		<div class="col">
	    			<div class="share-link">
	    				<h2>Share this</h2>
	    				<p>Share it with your friends note that download will expire in 8 hours</p>
		    			<ul class="social-share">
		    				<li>
								<a href="#"><i class="fab fa-facebook-f"></i></a>
							</li>
		    				<li><a href="#"><i class="fab fa-twitter"></i></a></li>
		    				<li><a href="#"><i class="fab fa-pinterest-p"></i></a></li>
		    				<li><a href="#"><i class="fab fa-instagram"></i></a></li>
		    			</ul>
	    			</div>
	    		</div>
	    	</div>
	    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { PlaceEvent } from '~/types/helpers';

export default defineComponent({
    props: ['downloadUrl'],
    
    setup(props, {emit}) {
        const highlighted = ref<boolean>(false);

        const onFileSelected = (e:PlaceEvent) => {
			emit('newUpload', e);
        }

        return {
            highlighted,
			onFileSelected
        }
    },
})
</script>
<style lang="postcss">
.download-zip{
	    border: #9c82c8 2px solid;
	    border-radius: 10px;
	    text-align: center;

	    .row{

	    	> div{
	    		padding: 10px;
	    	}

	    	&:nth-of-type(1){
				> div{
		    		&:nth-of-type(1){
		    			border-right: #9c82c8 2px solid;
		    			border-bottom: #9c82c8 2px solid;
		    		}

		    		&:nth-of-type(2){
		    			border-bottom: #9c82c8 2px solid;
		    		}
		    	}
	    	}

	    	&:nth-of-type(2){
				> div{
		    		&:nth-of-type(1){
		    			border-right: #9c82c8 2px solid;
		    		}
		    	}
	    	}
	    }

	    .completed{
	    	padding: 40px;
	    	.heading{
	    		font-family: "Lato", sans-serif;
	    		font-weight: 700;
	    		font-style: italic;
	    		font-size: 59px;
	    		color: #a598c8;
	    		margin-bottom: 30px;
	    	}

	    	> span{
	    		font-family: "Lato", sans-serif;
	    		font-size: 18px;
	    		background-color: #98be5e;
	    		color: #FFF;
	    		padding: 10px 15px;
				border-radius: 10px;
				
	    	}
	    }

	    .download-url{
	    	padding: 40px;
	    	> a{
	    		&.btn-download{
	    			display: inline-block;
	    			font-family: "Lato", sans-serif;
	    			font-size: 22px;
	    			font-weight: bold;
	    			text-transform: uppercase;
	    			color: #FFF;
	    			background-color: #98be5e;
	    			padding: 15px 25px;
	    			margin-bottom: 20px;
	    			text-decoration: none;
	    			border-radius: 10px;
	    		}
	    	}
	    	> p{
	    		font-family: "Montserrat", sans-serif;
	    		font-size: 13px;
	    		font-weight: 300;
	    		line-height: 22px;
	    		color: #FFF;
	    	}
	    }

	    .share-link{
	    	padding: 40px;
	    	> h2{
	    		font-family: "Lato", sans-serif;
	    		font-size: 30px;
	    		font-weight: 900;
	    		font-style: italic;
	    		color: #FFF;
	    	}
	    	> p{
	    		font-family: "Montserrat", sans-serif;
	    		font-weight: 300;
	    		font-size: 15px;
	    		line-height: 24px;
	    		color: #FFF;
	    	}
	    	> ul{
	    		display: table;
	    		width: 100%;
	    		list-style: none;
	    		margin: 0;
	    		padding: 0;
	    		> li{
	    			display: inline-block;
	    			padding: 10px;
	    			> a{
	    				display: block;
	    				width: 45px;
	    				height: 45px;
	    				border: #593f9a 5px solid;
	    				color: #FFF;
	    				border-radius: 50%;
	    				text-align: center;
	    				line-height: 35px;
	    				vertical-align: middle;
	    				> i{}
	    			}
	    		}
	    	}
	    }

	    .reupload{
	    	padding: 40px 20px;
	    	text-align: center;

			&.highlighted{
				background-color: #ffff0033;
    			border: #ffff0033 5px dashed;
			}

			> h2{
				font-family: "Lato", sans-serif;
				font-size: 30px;
	    		font-weight: 900;
	    		font-style: italic;
	    		color: #FFF;
			}

			> p{
				font-family: "Montserrat", sans-serif;
	    		font-weight: 300;
	    		font-size: 15px;
	    		line-height: 24px;
	    		color: #FFF;			
			}

			.file_upload{
				position: relative;
				display: inline-block;
			    overflow: hidden;
			    margin: 0 auto;
				
				.btn-upload{
					display: table;
					font-family: "Montserrat", sans-serif;
					font-size: 18px;
					color: #FFF;
					text-decoration: none;
					text-transform: uppercase;
					padding: 20px 60px;
					border-radius: 10px;
					border: none;
					background: rgb(206,148,234);
					background: -webkit-linear-gradient(rgba(206,148,234,1) 0%, rgba(137,94,209,1) 100%);
					background: -o-linear-gradient(rgba(206,148,234,1) 0%, rgba(137,94,209,1) 100%);
					background: linear-gradient(rgba(206,148,234,1) 0%, rgba(137,94,209,1) 100%);
				}

				input{
					&.input-files{
					    position: absolute;
					    left: 0;
					    top: 0;
					    opacity: 0;
					    width: 100%;
					    height: 67px;
					    z-index: 99;
					    cursor: pointer;
					}
				}
			}
		}
	}
</style>