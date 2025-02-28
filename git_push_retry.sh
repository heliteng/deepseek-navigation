#!/bin/bash
 
# 设置最大重试次数
MAX_RETRIES=10
RETRY_COUNT=0
 
# 定义推送命令
CMD="git push origin refs/heads/main:main"
 
# 循环直到成功或达到最大重试次数
until $CMD; do
    if [ $RETRY_COUNT -ge $MAX_RETRIES ]; then
        echo "达到最大重试次数，推送失败。"
        exit 1
    else
        echo "推送失败，正在重试... (尝试次数: $((RETRY_COUNT + 1)))"
        RETRY_COUNT=$((RETRY_COUNT + 1))
        sleep 5  # 等待5秒后重试
    fi
done
 
echo "推送成功！"