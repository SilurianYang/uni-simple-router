#!/bin/bash

# author hhyang 
# home  https://github.com/SilurianYang

 printf "\n -------------- Ctrl+D可以退出程序 --------------- \n\n"

select name in "auto" "status" "add" "commit" "push" "pull" "branch" "checkout" "*"; do
        case "$name" in 
            # 自动同步文件
            "auto")
                cp -avx ./examples/node_modules/uni-simple-router/* ./npm-package
                rm -rf ./npm-package/package-lock.json
                cp -avx ./README.md ./npm-package
                cp -avx ./package.json ./npm-package
                cp -avx ./npm-package/* ./src
                rm -rf ./src/README.md
                rm -rf ./src/package.json

                printf "\n -------------- 自动化构建目录完毕 --------------- \n\n"
            ;;

            # 查询status
            "status")
                git status
                printf "\n -------------- 查询完毕 --------------- \n\n"
            ;; 

            # 添加文件 .或* 全部文件 可自定义文件路径
            "add")
                while read -p "请输入更多提交命令 【默认全部.】 ：" add; do
                        if [[ "$add" == "" ]]; then
                            eval "git add ."
                        else 
                            eval "git add ${add}"
                        fi
                        printf "\n -------------- 添加完成 --------------- \n\n"
                        break
                done 
            ;;

            # 提交文件
            "commit")
                while read -p "请输入提交信息：" readme; do
                        if [[ "$readme" != "" ]]; then
                            eval "git commit -m '${readme}'"
                            printf "\n -------------- 提交本地完成 --------------- \n\n"
                            break
                        else
                            printf "\n警告====> 提交信息不能为空！  \n \n"
                        fi
                done 
            ;; 

            # 推送到服务端
            "push")
                read -p "请输入提交的分支(不输入默认主分支 [master] )：" branch
                printf "\n\n -------------- 正在推送github,请稍后.... --------------- \n\n"
                    if [[ "$branch" == "" ]]; then
                        git push
                    else
                        eval "git push origin ${branch}"
                    fi
                printf "\n -------------- 推送github完成 --------------- \n\n"
            ;;

            # 拉取最新代码
            "pull")
                printf "\n\n -------------- 正在拉取,请稍后.... --------------- \n\n"
                    git pull
                printf "\n -------------- 正在拉取完成 --------------- \n\n"
            ;;

            # 切换分支操作
            "branch")
                read -p "请输入添加更多指令 【分支】 ：" branchs
                    if [[ "$branchs" == "" ]]; then
                    printf "\n分支列表如下：\n\n"
                        git branch
                    else
                        eval "git branch ${branchs}"
                    fi
                printf "\n -------------- 分支操作完毕 --------------- \n\n"
            ;;
            # 
            "checkout")
                read -p "请输入添加更多指令 【默认切换到master】 ：" out
                if [[ "$out" == "" ]]; then
                    git checkout master
                else
                    eval "git checkout ${out}"
                fi
                printf "\n -------------- 执行完毕 --------------- \n\n"
            ;;
            # 自定义指令
            *)
            while read -p "请输入自定义命令 【输入:q退出】：" code; do
                if [[ "$code" == ":q" ]];then
                    printf "\n"
                    break
                fi
                printf "\n\n -------------- 正在执行,请稍后.... --------------- \n\n"
                    eval "$code"
                printf "\n -------------- 执行完毕 --------------- \n\n"
            done
        esac
done
