import React from 'react';
import '../Gioithieu/content.scss';
import { useState } from 'react';
import { listofnews } from '../../share/listOfnews';
const IntroductionPage = () => {
    const [newsArticles, setNewsArticles] = useState([
        {
            id: 1,
            title: 'Top 6 mẫu xe điện Yadea chuẩn Châu Âu đi hơn 100km/h chỉ với 1 lần sạc',
            imageUrl: 'image/new1.jpg', // Replace with actual image URLs
        },
        {
            id: 2,
            title: 'Xe đạp điện cao cấp RideScoozy VeeGo 750: Con thú tốc độ cao',
            imageUrl: 'image/new2.jpg',
        },
        {
            id: 3,
            title: 'Kế hoạch phát triển xe điện tương lai của hãng Nissan với 17 tỷ USD',
            imageUrl: 'image/new3.jpg',
        },
        // Add more news articles as needed
    ]);
    const [selectedArticle, setSelectedArticle] = useState(null);

    const handleArticleClick = (article) => {
        setSelectedArticle(article);
    };
    return (
        <div className="container mt-5">
            <div className="row">
                {/* Left side content */}
                <div className="col-md-8">
                    <div className="left-content">
                        {selectedArticle ? (
                            <div>
                                <button onClick={() => setSelectedArticle(null)}>TRỞ VỀ </button>
                                <h3>{selectedArticle.title}</h3>
                                <p>{selectedArticle.content}</p>
                            </div>
                        ) : (
                            <div>
                                <h2 style={{ borderBottom: '1px solid #ccc' }}> GIỚI THIỆU</h2>
                                <h5>Công ty TNHH Đầu tư Motors</h5>
                                <div class="company-info">
                                    <p>
                                        Công ty TNHH Đầu tư Motors là một trong những công ty đi đầu trong lĩnh vực kinh doanh xe đạp điện, xe máy điện có hệ thống showroom trải rộng trên khắp địa bàn Hồ Chí Minh.
                                    </p>
                                    <ul>
                                        <li>Cam kết giá tốt nhất cho khách hàng</li>
                                        <li>Dịch vụ giao hàng toàn quốc</li>
                                        <li>Hàng chính hãng mới 100% chưa qua sử dụng</li>
                                    </ul>
                                    <p>
                                        Với đội ngũ nhân viên trẻ năng động, chúng tôi cam kết mang đến cho khách hàng sự hài lòng tuyệt đối về chất lượng hàng hóa.
                                    </p>
                                    <p>
                                        Đến với chúng tôi, bạn sẽ được phục vụ tốt nhất, giá rẻ và dịch vụ hậu mãi tốt nhất.
                                    </p>
                                    <p>
                                        Với phương châm “Hợp tác để cùng thành công” và định hướng “Liên tục cải tiến”, <strong>Motors</strong> đã luôn nỗ lực cả về nhân lực, vật lực, xây dựng uy tín thương hiệu và niềm tin với khách hàng với những sản phẩm chúng tôi cung cấp.
                                    </p>
                                    <p>
                                        Với bề dày nhiều năm kinh nghiệm, chúng tôi luôn lắng nghe ý kiến của khách hàng, nỗ lực hàng ngày và tìm tòi áp dụng những công nghệ tốt nhất và an toàn nhất để mang lại lợi ích tốt nhất cho khách hàng.
                                    </p>
                                    <p>
                                        Sự tin tưởng và ủng hộ của khách hàng trong suốt thời gian qua là nguồn động viên to lớn trên bước đường phát triển của <strong>Motors</strong>. Chúng tôi xin hứa sẽ không ngừng hoàn thiện, phục vụ khách hàng tốt nhất để luôn xứng đáng với niềm tin ấy.
                                    </p>
                                    <p>
                                        Ban giám đốc và toàn thể cán bộ công nhân viên công ty <strong>Motors</strong> xin gửi lời tri ân sâu sắc đến toàn thể quý khách hàng, quý đối tác chiến lược đã và đang hợp tác với chúng tôi.
                                    </p>
                                    <p>
                                        Cảm ơn vì đã chọn chúng tôi!
                                    </p>
                                    <img src='image/imgcontent.jpg' className='company-image'></img>
                                </div>



                            </div>
                        )}
                    </div>



                </div>

                {/* Right side news */}
                <div className="col-md-4">
                    <div className="right-news">
                        <h2>TIN TỨC</h2>
                        <ul>
                            {newsArticles.map((article) => (
                                <li key={article.id}>
                                    <div className="news-item" onClick={() => handleArticleClick(article)}>
                                        <img
                                            src={article.imageUrl}
                                            alt={article.title}
                                            className="news-image"
                                        />
                                        <p className="news-title">{article.title}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>


    );
};

export default IntroductionPage;
