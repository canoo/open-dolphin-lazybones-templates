package ${PKG}.servlet;

import javax.servlet.ServletException;
import java.io.IOException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class InvalidationServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        if (req.getRequestURL().toString().contains("invalidate")) {
            req.getSession().invalidate();
            resp.getWriter().write("new session");
        }
    }
}
