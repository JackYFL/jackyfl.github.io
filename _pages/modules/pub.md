# 📝 Selected Publications
{: id="-publications"}

{% comment %}
  One include per paper. Cards (with an image) use _includes/pub-card.html and
  one-line entries use _includes/pub-item.html; their parameters are listed at
  the top of those files. tags are keys from _data/pub_filters.yml.
{% endcomment %}

{% include pub-filter.html %}

{% include pub-card.html
   venue="WACV 2027" image="spvpt-intro.png" tags="cv embodied"
   title="SP-VTP: Spatially Prompted Visual Trajectory Prediction for Egocentric Manipulation"
   authors="Yifan Li*, Xinyu Zhou*, Yunhao Ge, Yu Kong"
   star="JackYFL/SP-VTP"
   paper="https://arxiv.org/pdf/2605.20085"
   project="https://jackyfl.github.io/SP-VTP-project-page/"
   code="https://github.com/JackYFL/SP-VTP.git"
   data="https://huggingface.co/datasets/JackYFL233/EgoSPT/tree/main" %}

{% include pub-card.html
   venue="NeurlPS 2026" image="adala.png" tags="cv efficiency vfm"
   title="ViT-AdaLA: Adapting Vision Transformers with Linear Attention"
   authors="Yifan Li, Seunghyun Yoon, Viet Dac Lai, Franck Dernoncourt, Jason Kuen, Yu Kong, Trung Bui"
   star="JackYFL/ViT-AdaLA"
   paper="https://arxiv.org/pdf/2603.16063"
   project="https://jackyfl.github.io/vitadala-project-page"
   code="https://github.com/JackYFL/ViT-AdaLA" %}

{% include pub-card.html
   venue="ArXiv" image="IndustryNav.jpg" year="2025" tags="cv embodied vllm"
   title="IndustryNav: Exploring Spatial Reasoning of Embodied Agents in Dynamic Industrial Navigation"
   authors="Yifan Li*, Lichi Li*, Anh Dao*, Xinyu Zhou, Yicheng Qiao, Zheda Mai, Daeun Lee, Zichen Chen, Zhen Tan, Mohit Bansal, Yu Kong"
   star="JackYFL/IndustryNav"
   paper="https://arxiv.org/pdf/2511.17384"
   project="https://jackyfl.github.io/IndustryNav_project_page/"
   code="https://github.com/JackYFL/IndustryNav" %}

{% include pub-card.html
   venue="ICCV 2025" image="vitsplit-framework.png" tags="cv efficiency vfm"
   title="ViT-Split: Unleashing the Power of Vision Foundation Models via Efficient Splitting Heads"
   authors="Yifan Li, Xin Li, Tianqin Li, Wenbin He, Yu Kong, Ren Liu"
   star="JackYFL/ViT-Split"
   paper="https://arxiv.org/pdf/2506.03433"
   code="https://github.com/JackYFL/ViT-Split"
   project="https://jackyfl.github.io/vitsplit.github.io/" %}

{% include pub-card.html
   venue="NeurIPS 2025 D&B" image="IndustryEQA.png" tags="cv embodied vllm"
   title="IndustryEQA: Pushing the Frontiers of Embodied Question Answering in Industrial Scenarios"
   authors="Yifan Li*, Yuhang Chen*, Anh Dao*, Lichi Li, Zhongyi Cai, Zhen Tan, Tianlong Chen, Yu Kong"
   star="JackYFL/IndustryEQA"
   paper="https://arxiv.org/pdf/2505.20640"
   project="https://jackyfl.github.io/IndustryEQA_project_page/"
   benchmark="https://huggingface.co/datasets/IndustryEQA/IndustryEQA"
   code="https://github.com/JackYFL/IndustryEQA" %}

{% include pub-card.html
   venue="CVPRW 2025" image="wico.png" tags="cv efficiency vllm"
   title="Window Token Concatenation for Efficient Visual Large Language Models"
   authors="Yifan Li, Wentao Bao, Botao Ye, Zhen Tan, Tianlong Chen, Huan Liu, Yu Kong"
   star="JackYFL/WiCo"
   paper="https://arxiv.org/pdf/2504.04024"
   code="https://github.com/JackYFL/WiCo/" %}

{% include pub-card.html
   venue="ArXiv" image="VLM_trends.png" year="2025" tags="cv vllm"
   title="Visual Large Language Models for Generalized and Specialized Applications"
   authors="Yifan Li, Zhixin Lai, Wentao Bao, Zhen Tan, Anh Dao, Kewei Sui, Jiayi Shen, Dong Liu, Huan Liu, Yu Kong"
   star="JackYFL/awesome-VLLMs"
   paper="https://arxiv.org/pdf/2501.02765"
   project="https://github.com/JackYFL/awesome-VLLMs" %}

{% include pub-card.html
   venue="ECCV 2024" image="EmoLAv2_ECCV2024.png" tags="cv vllm"
   title="Facial Affective Behavior Analysis with Instruction Tuning"
   authors="Yifan Li, Anh Dao, Wentao Bao, Zhen Tan, Tianlong Chen, Huan Liu, Yu Kong"
   star="JackYFL/EmoLA"
   paper="https://arxiv.org/pdf/2404.05052"
   project="https://jackyfl.github.io/FABA_project_page/"
   code="https://github.com/JackYFL/EmoLA" %}

{% include pub-card.html
   venue="BMVC 2023" image="ReCoT_BMVC2023.png" tags="cv"
   title="ReCoT: Regularized Co-Training for Facial Action Unit Recognition with Noisy Labels"
   authors="Yifan Li, Hu Han, Shiguang Shan, Zhilong Ji, Jinfeng Bai, Xilin Chen"
   url="https://papers.bmvc2023.org/0102.pdf"
   paper="https://github.com/JackYFL/jackyfl.github.io/tree/main/files/BMVC2023_camera_readyV2.pdf"
   appendix="https://github.com/JackYFL/jackyfl.github.io/tree/main/files/BMVC2023_appendix.pdf"
   poster="https://github.com/JackYFL/jackyfl.github.io/tree/main/files/ReCoT_BMVC2023_poster.png" %}

{% include pub-card.html
   venue="CVPR 2023" image="DISC_CVPR2023.png" tags="cv"
   title="DISC: Learning from Noisy Labels via Dynamic Instance-Specific Selection and Correction"
   authors="Yifan Li, Hu Han, Shiguang Shan, Xilin Chen"
   star="JackYFL/DISC"
   paper="https://openaccess.thecvf.com/content/CVPR2023/papers/Li_DISC_Learning_From_Noisy_Labels_via_Dynamic_Instance-Specific_Selection_and_CVPR_2023_paper.pdf"
   code="https://github.com/JackYFL/DISC"
   poster="https://github.com/JackYFL/DISC/blob/main/assets/DISC_poster.png" %}

{% include pub-card.html
   venue="ECCVW 2022" image="EMMA_ECCVW2022.png" tags="cv"
   title="Affective Behaviour Analysis Using Pretrained Model with Facial Prior"
   authors="Yifan Li, Haomiao Sun, Zhaori Liu, Hu Han, Shiguang Shan"
   star="JackYFL/EMMA_CoTEX_ABAW4"
   paper="https://arxiv.org/pdf/2207.11679"
   code="https://github.com/JackYFL/EMMA_CoTEX_ABAW4" %}

{% include pub-item.html
   venue="ArXiv 2026" tags="cv embodied"
   title="ADAPT: Audio-Depth Action Planning with Transition-Aware Rewards for Lights-Out Industrial Navigation"
   url="https://arxiv.org/pdf/2610.15956"
   authors="Wenjun Huang, Shenghao Fu, Yian Jin, Yang Ni, Yifan Li, Lichi Li, Xingjian Diao, Pengfei Zhang, Yutong Song, Hanning Chen, Jiarui Cui, Tianyu Yang, Shilong Li, Yu Kong, Mohsen Imani" %}

{% include pub-item.html
   venue="TechRxiv 2026" tags="cv embodied"
   title="A Survey of Continual Learning for Robotics in the Foundation Model Era"
   url="https://doi.org/10.36227/techrxiv.176972367.76460794/v3"
   authors="Zheda Mai, Zanming Huang, Sooyoung Jeon, Jinsu Yoo, Colin Lee, Gengyu Zhang, Haoxuan Wang, Yifan Li, Yu Kong, Yan Yan, Wei-Lun Chao" %}

{% include pub-item.html
   venue="CVPRW 2024" tags="cv vllm"
   title="The Wolf Within: Covert Injection of Malice into MLLM Societies via an MLLM Operative"
   url="https://arxiv.org/pdf/2402.14859"
   authors="Zhen Tan, Chengshuai Zhao, Raha Moraffah, Yifan Li, Yu Kong, Tianlong Chen, Huan Liu" %}

{% include pub-item.html
   venue="EMNLP 2025" tags="nlp vllm"
   title="Task-Aware Resolution Optimization for Visual Large Language Models"
   url="https://arxiv.org/pdf/2510.09822"
   authors="Weiqing Luo, Zhen Tan, Yifan Li, Xinyu Zhao, Kwonjoon Lee, Behzad Dariush, Tianlong Chen" %}

{% include pub-item.html
   venue="PAKDD 2024" tags="nlp efficiency"
   title="Smoa: Improving Multi-agent Large Language Models with Sparse Mixture-of-Agents"
   url="https://arxiv.org/pdf/2411.03284?"
   authors="Dawei Li, Zhen Tan, Peijia Qian, Yifan Li, Kumar Satvik Chaudhary, Lijie Hu, Jiayi Shen" %}

{% include pub-item.html
   venue="EMNLP 2024" tags="nlp"
   title="“Glue pizza and eat rocks” - Exploiting Vulnerabilities in Retrieval-Augmented Generative Models"
   url="https://arxiv.org/pdf/2406.19417"
   authors="Zhen Tan, Chengshuai Zhao, Raha Moraffah, Yifan Li, Song Wang, Jundong Li, Tianlong Chen, Huan Liu" %}

{% comment %} Hidden for now; delete these comment tags to show this section again.
## 📚 Other Research Papers

{% include pub-item.html
   venue="TII 2020" tags=""
   title="An Indoor Localization Algorithm Based on Modified Joint Probabilistic Data Association for Wireless Sensor Network"
   url="https://ieeexplore.ieee.org/abstract/document/9031316"
   authors="Long Cheng, Yifan Li, Mingkun Xue, Yan Wang" %}
{% endcomment %}
